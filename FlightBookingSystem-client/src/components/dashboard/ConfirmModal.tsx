/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal } from "flowbite-react";

import { HiOutlineExclamationCircle } from "react-icons/hi";
import { MdDelete } from "react-icons/md";

export function ConfirmModal({
  openModal,
  setOpenModal,
  deleteFlight,
  id
}: {
  openModal: boolean;
  setOpenModal: any;
  deleteFlight: any;
  id: string;
}) {
  return (
    <>
      <Button className="bg-red-700" onClick={() => setOpenModal(true)}>
        <MdDelete className="text-xl" />
      </Button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => deleteFlight(id)}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
