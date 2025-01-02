
"use client";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

interface ICompmodal {
  handleTransaction: () => void;
}
export default function Compmodal({ handleTransaction }: ICompmodal) {
    const [openModal, setOpenModal] = useState(true);

    return(
        <div>
      <Button onClick={() => setOpenModal(true)} className="bg-[#387874]">Continue Payment</Button>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Are you sure you want to Buy this ticket?
            </h3>
            <div className="flex justify-center gap-4">
              <Button className="bg-[#387874]" onClick={() => { setOpenModal(false); handleTransaction(); }}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
    )
}