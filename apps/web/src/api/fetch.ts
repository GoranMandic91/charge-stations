export const fetchJson = async <D = null>(
  input: RequestInfo,
  init?: RequestInit,
  options = { logger: console }
): Promise<D> => {
  const { logger } = options;
  try {
    const res = await fetch(input, init);

    if (!res.ok) {
      throw {
        name: "FetchError" + res.status,
        statusCode: res.status,
        message: `Request failed with status: ${res.status} ${res.statusText}`,
      };
    }

    return res.status === 204 ? null : await res.json();
  } catch (e) {
    logger.error(e);
    throw e;
  }
};
