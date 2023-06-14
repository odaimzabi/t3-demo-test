/* eslint-disable @typescript-eslint/no-misused-promises */
import React from "react";
import Button from "~/components/DeleteButton";
import LoadingIndicator from "~/components/LoadingIndicator";
import { api } from "~/utils/api";

const Example = ({
  id,
  updateList,
}: {
  id: string;
  updateList: () => Promise<void>;
}) => (
  <>
    <span>{`Example : ${id}`}</span>
    <Button id={id} updateList={updateList} />
  </>
);

export default function Examples() {
  const {
    data: examples,
    isLoading: isLoadingList,
    refetch,
  } = api.example.getAll.useQuery();

  const updateList = async () => {
    await refetch();
  };
  return (
    <>
      {isLoadingList ? (
        <LoadingIndicator />
      ) : (
        <div className="flex flex-col items-center">
          <span>Examples</span>
          <div className="flex flex-col items-center">
            {examples?.examples.map((example) => (
              <Example
                id={example.id}
                key={example.id}
                updateList={updateList}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
