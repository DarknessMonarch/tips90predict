"use client";

import styles from "@/app/styles/about.module.css";

export default function Disclaimer() {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.aboutContainerInner}>
        <p>
          Tips90predict.com is an informational platform, not a betting or
          gambling site, and does not facilitate any form of wagering. We
          provide forecasts, strategies, and guides based on our best efforts,
          but occasional inaccuracies may occur.
        </p>
        <p>
          Our forecasts are meant solely as suggestions and are not endorsements
          to participate in betting. Gambling should be viewed as entertainment,
          and users of Tips90predict.com assume full responsibility for their
          actions and decisions. Tips90predict and its team disclaim liability
          for any financial or other adverse outcomes resulting from the use of
          our content.
        </p>
        <p>
          We advise all users to consider any restrictions on betting within
          their countries and to comply with local laws. We reserve the right to
          update or correct content on our platform without prior notice. All
          images on our website are sourced online unless otherwise stated; if
          copyrighted images have been included in error, please contact us for
          prompt removal.
        </p>
        <p>
          By using our services, you acknowledge that all tips and predictions
          are for informational purposes only. Tips90predict disclaims
          responsibility for any losses resulting from reliance on our content,
          and we neither support nor promote gambling. Users under 18 must
          obtain parental consent to access our services.
        </p>
      </div>
    </div>
  );
}
