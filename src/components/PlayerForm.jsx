import { Show, createSignal } from "solid-js";

export function PlayerForm() {
  const [playerType, setPlayerType] = createSignal("");

  function handleSubmit(event) {
    event.preventDefault();
    setPlayerType(event.currentTarget.value);
  }

  return (
    <div class="center">
      <h3 class="center player-form-headline" style="color: var(--fourXBlue);">
        What type of player are you?
        <Show when={playerType()}>
          <h4 class="uppercase player-type">{playerType()}</h4>
        </Show>
      </h3>

      <Show
        when={playerType() === ""}
        fallback={
          <p class="questionnaire-result">
            <Show
              when={playerType() === "player"}
              fallback={
                <>
                  You have enough to worry about, let Nurl help with the rest.
                  <br />
                  <br />
                  We give you all the tools you need to easily plan and run game
                  sessions with super-charged features like never before. Nurl
                  is a hub for your group that includes enhanced notes, chat,
                  realtime dashboards, and more.
                  <br />
                  <br />
                  Now you can focus on telling the story and not answer the
                  question "Where are we again?".
                </>
              }
            >
              We give you all the tools you need to easily learn and play a game
              that is supercharged with enhanced features so your entire party
              can also have a place right along side you. Gone are the days of
              overly complex character sheets and notes.
              <br />
              <br />
              Now you can focus on telling <em>their</em> story and not figuring
              out how to cast a spell.
            </Show>
          </p>
        }
      >
        <div class="questionnaire">
          <button
            class="btn player-form-btn"
            value="player"
            onClick={handleSubmit}
          >
            Player
          </button>
          <button class="btn player-form-btn" value="gm" onClick={handleSubmit}>
            GM
          </button>
        </div>
      </Show>
    </div>
  );
}
