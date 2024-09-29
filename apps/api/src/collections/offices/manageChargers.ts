import { getConfig } from "../../config";
import { database } from "../../database";
import { OfficeDocument } from "../../types";

export const manageChargers = async (): Promise<void> => {
  const { mongoClient } = database();
  const { durationInMS } = getConfig();

  const currentDate = new Date();
  const officeCollection = mongoClient()
    .db()
    .collection<OfficeDocument>("offices");

  const offices = await officeCollection
    .find({ "queue.0": { $exists: true } })
    .toArray();

  for (const office of offices) {
    let chargersFreed: { id: number; date: Date }[] = [];
    for (const { id, sessionStart } of office.chargers) {
      if (sessionStart) {
        const sessionDuration = currentDate.getTime() - sessionStart.getTime();
        const maxAllowedDuration = office.highDemandDuration * durationInMS;
        if (sessionDuration > maxAllowedDuration) {
          chargersFreed.push({ id, date: sessionStart });
        }
      }
    }

    const sortedByDate = chargersFreed.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    const stillHighDemand = sortedByDate.length < office.queue.length;
    if (sortedByDate.length > 0 && office.queue.length > 0) {
      for (const { id: chargerId } of chargersFreed) {
        const userRequest = office.queue.shift();
        if (userRequest) {
          const index = office.chargers.findIndex(({ id }) => id === chargerId);
          office.chargers[index].available = false;
          office.chargers[index].reservedBy = userRequest.user;
          office.chargers[index].sessionStart = currentDate;
          office.chargers[index].sessionEnd = null;
          if (stillHighDemand) {
            const currentDateInMS = currentDate.getTime();
            const highDemandInMS = office.highDemandDuration * durationInMS;
            const sessionEnd = new Date(currentDateInMS + highDemandInMS);
            office.chargers[index].sessionEnd = sessionEnd;
          }
        }
      }
    }

    await officeCollection.updateOne(
      { _id: office._id },
      { $set: { chargers: office.chargers, queue: office.queue } }
    );
  }
};
