import {DocumentList, CTACard, ModalRegisOnline as ModalRegisOnline} from "./ModalRegisOnline"
import {motion} from "framer-motion"
import { useState } from "react";

const Requirements = () => {
  const documents = ["KTP", "Ijazah S1 & S2", "Sertifikat TPA", "TOEFL/IELTS", "Surat Rekomendasi", "Proposal Disertasi"];
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <motion.div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#207D96]/10 to-[#1B3F6E]/10 rounded-full blur-3xl" animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} transition={{ duration: 20, repeat: Infinity }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <DocumentList documents={documents} />
            <CTACard onOpenModal={() => setIsModalOpen(true)} />
          </div>
        </div>
      </div>

      <ModalRegisOnline isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default Requirements;