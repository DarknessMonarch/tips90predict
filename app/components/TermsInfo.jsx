"use client";

import styles from "@/app/styles/about.module.css";

export default function TermsInfo() {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.aboutContainerInner}>
        <p>
          By using tips90predict.com or any affiliated sites, pages, or
          accounts, or by signing up, you agree to the following terms and
          conditions. Please read them carefully, and if you disagree, refrain
          from using the website.
        </p>
        <h2>General Terms</h2>
        <p>
          <strong>Content:</strong> All betting tips, predictions, analyses, and
          statistics on tips90predict.com are recommendations and opinions, not
          guarantees. Users engage in betting at their own risk. We urge
          responsible betting and cannot be held accountable for any losses.
          Refunds for payments made are not available.
        </p>
        <p>
          <strong>Legal Compliance:</strong> Betting may be restricted in
          certain regions. Users are responsible for following local laws.
          Unauthorized reproduction or use of our content is prohibited. Please
          contact us if you wish to use any materials.
        </p>
      </div>
      <div className={styles.aboutContainerInner}>
        <h2>Liability</h2>
        <p>
          <strong>Accuracy:</strong> While we strive for accuracy,
          tips90predict.com does not guarantee the completeness or reliability
          of the information provided. All information is &quot;as is&quot; and may
          contain inaccuracies or outdated material. We are not obligated to
          update any information.
        </p>
        <p>
          <strong>User Responsibility:</strong> Any gains or losses from betting
          are solely the user&apos;s responsibility. tips90predict.com cannot be
          liable for any damages or losses related to services, picks, or
          predictions.
        </p>
        <h2>Additional Provisions</h2>
        <p>
          These Terms & Conditions, together with our Privacy Policy and any
          site rules, form the full agreement. By accepting them, you agree not
          to rely on any other representations. These Terms do not create any
          partnership or agency relationship.
        </p>
        <p>
          If any term is deemed unenforceable, the remaining terms will remain
          effective. tips90predict.com is not liable for delays or
          non-performance due to factors beyond our control, such as technical
          issues or extreme weather events.
        </p>
      </div>
    </div>
  );
}
