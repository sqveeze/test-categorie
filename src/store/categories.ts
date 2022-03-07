interface Item {
  name: string;
  startDate: Date | null;
  endDate: Date | null;
}

export interface ICategorie {
  name: string;
  items: Item[];
}

export const categories: ICategorie[] = [
  {
    name: "Item 1",
    items: [
      {
        name: "Item 1",
        startDate: new Date(),
        endDate: new Date(),
      },
      {
        name: "Item 2",
        startDate: new Date(),
        endDate: new Date(),
      },
    ],
  },
  {
    name: "Item 2",
    items: [],
  },
  {
    name: "Item 3",
    items: [
      {
        name: "Item 1",
        startDate: new Date(),
        endDate: new Date(),
      },
      {
        name: "Item 2",
        startDate: new Date(),
        endDate: new Date(),
      },
      {
        name: "Item 3",
        startDate: new Date(),
        endDate: new Date(),
      },
    ],
  },
  {
    name: "Item 4",
    items: [
      {
        name: "Item 1",
        startDate: new Date(),
        endDate: new Date(),
      },
      {
        name: "Item 2",
        startDate: new Date(),
        endDate: new Date(),
      },
      {
        name: "Item 3",
        startDate: new Date(),
        endDate: new Date(),
      },
      {
        name: "Item 4",
        startDate: new Date(),
        endDate: new Date(),
      },
    ],
  },
];
