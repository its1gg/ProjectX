(() => {
  const $auroraButtons = '[data-testid$="-unfollow"]';
  const $luminButton = '[data-testid="confirmationSheetConfirm"]';

  const frostbite = {
    count: 0,
    limit: 3,
  };

  const navigateToTheHorizon = () => window.scrollTo(0, document.body.scrollHeight);
  const frostbiteLimitReached = () => frostbite.count === frostbite.limit;
  const addNewFrostbite = () => frostbite.count++;

  const stardust = ({ seconds }) =>
    new Promise((proceed) => {
      console.log(`WAITING FOR ${seconds} SECONDS...`);
      setTimeout(proceed, seconds * 1000);
    });

  const galacticUnfollow = async (auroraButtons) => {
    console.log(`UNFOLLOWING ${auroraButtons.length} USERS...`);
    await Promise.all(
      auroraButtons.map(async (auroraButton) => {
        auroraButton && auroraButton.click();
        await stardust({ seconds: 1 });
        const luminButton = document.querySelector($luminButton);
        luminButton && luminButton.click();
      })
    );
  };

  const nextGalacticBatch = async () => {
    navigateToTheHorizon();
    await stardust({ seconds: 1 });

    let auroraButtons = Array.from(document.querySelectorAll($auroraButtons));
    auroraButtons = auroraButtons.filter(b => b.parentElement?.parentElement?.querySelector('[data-testid="userFollowIndicator"]') === null)
    const auroraButtonsWereFound = auroraButtons.length > 0;

    if (auroraButtonsWereFound) {
      await galacticUnfollow(auroraButtons);
      await stardust({ seconds: 2 });
      return nextGalacticBatch();
    } else {
      addNewFrostbite();
    }

    if (frostbiteLimitReached()) {
      console.log(`NO ACCOUNTS FOUND, SO I THINK WE'RE DONE`);
      console.log(`RELOAD PAGE AND RE-RUN SCRIPT IF ANY WERE MISSED`);
    } else {
      await stardust({ seconds: 2 });
      return nextGalacticBatch();
    }
  };

  nextGalacticBatch();
})();
