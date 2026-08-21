import type { Metadata } from "next";
import styles from "./egg.module.css";

export const metadata: Metadata = {
  title: "Easter egg | Kanary Calling",
  description: "You found it.",
  robots: { index: false, follow: false },
};

export default function EggPage() {
  return (
    <main className={styles.page}>
      <h1 className="sr-only">Easter egg</h1>
      <img
        className={styles.egg}
        src="/giant-egg.jpg"
        alt="A giant cream-colored egg"
      />
    </main>
  );
}
