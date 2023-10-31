export type Data = {
  id: string;
  name: string;
  children?: Data[];
};

export const data: Data[] = [
  {
    id: "1",
    name: "1",
    children: [
      {
        id: "1-1",
        name: "1-1",
        children: [
          {
            id: "1-1-1",
            name: "1-1-1",
            children: [
              {
                id: "1-1-1-1",
                name: "1-1-1-1",
                children: [
                  {
                    id: "1-1-1-1-1",
                    name: "1-1-1-1-1",
                  },
                  {
                    id: "1-1-1-1-2",
                    name: "1-1-1-1-2",
                  },
                ],
              },
              {
                id: "1-1-1-2",
                name: "1-1-1-2",
              },
            ],
          },
          {
            id: "1-1-2",
            name: "1-1-2",
            children: [
              {
                id: "1-1-2-1",
                name: "1-1-2-1",
              },
              {
                id: "1-1-2-2",
                name: "1-1-2-2",
              },
            ],
          },
        ],
      },
      {
        id: "1-2",
        name: "1-2",
      },
    ],
  },
  {
    id: "2",
    name: "2",
    children: [
      {
        id: "2-1",
        name: "2-1",
      },
      {
        id: "2-2",
        name: "2-2",
        children: [
          {
            id: "2-2-1",
            name: "2-2-1",
          },
          {
            id: "2-2-2",
            name: "2-2-2",
          },
        ],
      },
    ],
  },
];
