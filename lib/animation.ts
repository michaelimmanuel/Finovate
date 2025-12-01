export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.5, delay } },
})

export const staggerChildren = (stagger = 0.06) => ({
  animate: { transition: { staggerChildren: stagger } },
})
