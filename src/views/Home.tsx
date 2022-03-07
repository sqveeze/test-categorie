import React from "react";
import {categories} from "../store/categories";
import {useStore} from "../store/use-store";
import {useRouter} from "next/router";

export const HomeView: React.FC = (): JSX.Element => {
  const router = useRouter();
  const {categorieList, setCategorieList} = useStore();
  const [activeRow, setActiveRow] = React.useState<number | null>(0);

  const dragItem = React.useRef();
  const dragOverItem = React.useRef();

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    order: number,
  ) => {
    // ignore for now. Can be typed but this is just a test.
    // @ts-ignore
    dragItem.current = order;
  };

  const handleDragEnter = (
    e: React.DragEvent<HTMLDivElement>,
    order: number,
  ) => {
    // ignore for now. Can be typed but this is just a test.
    // @ts-ignore
    dragOverItem.current = order;
    const listCopy = [...categorieList[activeRow as number].items];

    // ignore for now. Can be typed but this is just a test.
    // @ts-ignore
    const draggingItemContent = listCopy[dragItem.current];

    // ignore for now. Can be typed but this is just a test.
    // @ts-ignore
    listCopy.splice(dragItem.current, 1);

    // ignore for now. Can be typed but this is just a test.
    // @ts-ignore
    listCopy.splice(dragOverItem.current, 0, draggingItemContent);

    dragItem.current = dragOverItem.current;
    // ignore for now. Can be typed but this is just a test.
    // @ts-ignore
    dragOverItem.current = null;

    const newList = [...categorieList];

    newList[activeRow as number].items = listCopy;

    setCategorieList(newList);
  };

  const handleSetActiveRow = (rowNumber: number) => {
    if (activeRow === rowNumber) {
      return setActiveRow(null);
    }

    setActiveRow(rowNumber);
  };

  const handleSearch = (value: string) => {
    setActiveRow(0);

    if (!value) return setCategorieList(categories);

    const searchResult = categories.filter(category =>
      category.name.toLowerCase().includes(value.toLowerCase()),
    );

    setCategorieList(searchResult);
  };

  const onDelete = (rowIndex: number) => {
    const list = [...categorieList];

    if (categorieList[rowIndex].items.length > 0) {
      const result = confirm("Weet je het zeker?");

      if (result) {
        // continue
      } else {
        return;
      }
    }

    list.splice(rowIndex, 1);

    if (list.length === 0) setActiveRow(null);
    if (activeRow === rowIndex) setActiveRow(null);

    setCategorieList(list);
  };

  React.useEffect(() => {
    if (router.isReady && router.query["selected-category"]) {
      setActiveRow(+router.query["selected-category"]);
    }
  }, [router.isReady]);

  return (
    <React.Fragment>
      <div>
        <input
          placeholder="Categorie zoeken"
          onChange={e => handleSearch(e.target.value)}
        />
      </div>
      <div>
        <h4>Categorie</h4>
      </div>
      <div>
        {categorieList?.length > 0 &&
          categorieList?.map((categorie, index) => {
            return (
              <div
                key={`categorie_${categorie.name}_${index}`}
                className={`categorie-item ${
                  activeRow === index ? "categorie-item-active" : ""
                }`}
                onClick={() => handleSetActiveRow(index)}
              >
                <div>{categorie.name}</div>
                <div>
                  <a className="delete" onClick={() => onDelete(index)}>
                    Verwijder
                  </a>
                </div>
              </div>
            );
          })}
        {categorieList.length === 0 && (
          <div>
            <p>Geen categorieën</p>
          </div>
        )}
      </div>
      <div className="instantie">
        <div>
          <h4>Instantie</h4>
        </div>
        <div>
          <button
            disabled={activeRow === null}
            onClick={() =>
              router.push({
                pathname: "/add-instantie",
                query: {category: activeRow},
              })
            }
          >
            Nieuw instantie
          </button>
        </div>
      </div>
      <div>
        {activeRow === null && (
          <div>
            <p>Selecteer categorie</p>
          </div>
        )}
        {activeRow !== null &&
          categorieList[+activeRow]?.items?.length > 0 &&
          categorieList[+activeRow]?.items?.map((instance, index) => {
            return (
              <div
                key={`instance_item_${instance.name}_${index}`}
                className="instance-item"
                draggable
                onDragStart={e => handleDragStart(e, index)}
                onDragEnter={e => handleDragEnter(e, index)}
                onDragOver={e => e.preventDefault()}
              >
                {instance.name}
              </div>
            );
          })}
        {activeRow !== null && categorieList[+activeRow]?.items?.length === 0 && (
          <div>
            <p>leeg</p>
          </div>
        )}
      </div>
      <style jsx>{`
        .categorie-item {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 4px;
          cursor: pointer;
        }
        .categorie-item:hover {
          background-color: grey;
        }
        .categorie-item-active {
          background-color: yellow;
        }
        .instance-item {
          padding: 4px;
          cursor: pointer;
        }
        .instantie {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }
        .delete:hover {
          text-decoration: underline;
        }
      `}</style>
    </React.Fragment>
  );
};
