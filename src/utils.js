export const listToEntity = (items) => {
  const entities = items.reduce((acc, t) => {
    acc[t.id.replace(/ /g, "-")] = t;
    return acc;
  }, {});

  return {
    ids: Object.keys(entities),
    entities,
  };
};
