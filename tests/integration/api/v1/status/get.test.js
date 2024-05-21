test("Get to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  const versionDb = responseBody.dependencies.database.version;
  expect(versionDb).toBeDefined();
  expect(versionDb).toEqual("16.0");

  const maxConnections = responseBody.dependencies.database.max_connections;
  expect(maxConnections).toBeDefined();
  expect(maxConnections).toEqual(100);

  const currentConnections =
    responseBody.dependencies.database.current_connections;
  expect(currentConnections).toBeDefined();
  expect(currentConnections).toEqual(1);
});
