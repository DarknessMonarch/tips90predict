"use client";

import Image from "next/image";
import { useMemo } from "react";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import styles from "@/app/styles/sportcard.module.css";

export default function SportCard({
  formationA = ["l", "w", "d", "l", "w"],
  formationB = ["l", "w", "d", "l", "w"],
  leagueImage,
  teamAImage,
  teamBImage,
  tip = "0",
  league,
  teamA,
  teamB,
  teamAscore,
  teamBscore,
  time,
  status,
  sport,
  showScore,
  component,
}) {
  const router = useRouter();

  const formattedTime = useMemo(() => {
    const localTime = DateTime.fromISO(time).setZone(DateTime.local().zoneName);
    return localTime.toFormat("HH:mm");
  }, [time]);

  const getFormationColorClass = (formation) => {
    switch (formation) {
      case "w":
        return styles.win;
      case "d":
        return styles.draw;
      case "l":
        return styles.lose;
      default:
        return styles.defaultColor;
    }
  };

  return (
    <div
      className={styles.cardContainer}
    >
      <div className={styles.cardWrapper}>
        <div className={styles.cardTop}>
          <div className={styles.leagueInfo}>
            <Image
              src={leagueImage}
              alt={`${league} image`}
              width={35}
              height={35}
              priority={true}
              className={styles.leagueImage}
            />
            <h1>{league}</h1>
          </div>
          <div className={styles.cardStatus}>
            <span>{status ? status : ""}</span>
          </div>
        </div>
        <div className={styles.cardMiddle}>
          <div className={styles.teamContainer}>
            <div className={styles.teamInner}>
              <Image
                src={teamAImage}
                alt={`${teamA} image`}
                priority={true}
                width={60}
                height={60}
                className={`${styles.teamImage} ${
                  sport === "basketball" ? styles.circularShape : ""
                }`}
              />
              <h2>{teamA}</h2>
            </div>
            {showScore ? <h1>{teamAscore}</h1> : ""}
          </div>
          <div className={styles.matchInfo}>
            <h3>[{formattedTime}]</h3>
            {showScore ? "" : <h1>VS</h1>}
            {sport === "Extra" ? "" : component}
          </div>
          <div className={styles.teamContainer}>
            {showScore ? <h1>{teamBscore}</h1> : ""}
            <div className={styles.teamInner}>
              <Image
                src={teamBImage}
                alt={`${teamB} image`}
                priority={true}
                width={60}
                height={60}
                className={`${styles.teamImage} ${
                  sport === "basketball" ? styles.circularShape : ""
                }`}
              />
              <h2>{teamB}</h2>
            </div>
          </div>
        </div>
        <div className={styles.tipContainer}>
          <h2>Tip:</h2>
          <h4>{tip}</h4>
        </div>
        <div className={styles.cardBottom}>
          <div className={styles.formation}>
            {formationA.map((result, index) => (
              <div
                key={index}
                className={`${styles.formationCircle} ${getFormationColorClass(
                  result
                )}`}
              >
                <span>{result.toUpperCase()}</span>
              </div>
            ))}
          </div>
          <h4>Recent Form</h4>
          <div className={styles.formation}>
            {formationB.map((result, index) => (
              <div
                key={index}
                className={`${styles.formationCircle} ${getFormationColorClass(
                  result
                )}`}
              >
                <span> {result.toUpperCase()} </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
