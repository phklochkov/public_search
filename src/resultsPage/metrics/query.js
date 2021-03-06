function analysisSystem(properties) {
  return {
    chemicalFormula: [
      {
        analysis: [
          {
            type: 'categorical',
            path: 'chemicalFormula',
            size: 25,
            traversalMode: 'breadth_first',
          },
        ],
      },
    ],
    properties: [
      {
        name: [
          {
            filter: properties.map(property => ({ equal: property, exact: true })),
            analysis: [
              {
                type: 'categorical',
                path: 'chemicalFormula.property',
                traversalMode: 'breadth_first',
              },
            ],
          },
        ],
        value: [
          {
            analysis: [
              {
                type: 'statistics',
                path: 'chemicalFormula.property.units.numeric',
              },
              {
                type: 'categorical',
                path: 'chemicalFormula.property.units.categorical',
                size: 1,
                traversalMode: 'breadth_first',
              },
            ],
          },
        ],
        units: [
          {
            analysis: [
              {
                type: 'categorical',
                path: 'chemicalFormula.property.units',
                size: 1,
                missing: 'unitless',
                traversalMode: 'breadth_first',
              },
            ],
          },
        ],
      },
    ],
  };
}

export default function (userQueries, properties) {
  const query = {
    query: [{
      system: userQueries,
    }],
    size: 0,
  };
  query.query[0].system.push(analysisSystem(properties));
  return query;
}
