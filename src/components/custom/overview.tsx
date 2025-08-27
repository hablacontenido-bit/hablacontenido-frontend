import { motion } from 'framer-motion';

export const Overview = () => {
  return (
    <>
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto md:mt-20"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.75 }}
    >
      <div className="rounded-xl p-6 flex flex-col gap-8 leading-relaxed text-center max-w-xl">
        <p className="flex flex-row justify-center gap-4 items-center">
          <img
            src="/avatar/millennial.png"
            alt="Millennial Estoico"
            className="size-20 rounded-full ring-1 ring-border object-cover"
          />
        </p>
        <p>
          ¡Hey! Soy <strong>Millennial Estoico </strong><br />
          Estoy aquí para escucharte, ayudarte a pensar con claridad o simplemente charlar <strong>sin juicio</strong>.  
          ¿Tienes algo en mente o empezamos con algo random?
        </p>
      </div>
    </motion.div>
    </>
  );
};
