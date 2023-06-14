/* eslint-disable @typescript-eslint/no-misused-promises */
import React from "react";
import { api } from "~/utils/api";

type Props = {
  id: string;
  updateList: () => Promise<void>;
};

export default function DeleteButton({ id, updateList }: Props) {
  const { mutateAsync: deleteSingle, isLoading: isDeleting } =
    api.example.deleteSingle.useMutation();

  const handleDelete = async (id: string) => {
    await deleteSingle({ id });
    await updateList();
  };
  return (
    <button
      className="rounded-sm bg-red-700 p-2 text-white"
      onClick={async () => await handleDelete(id)}
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}
