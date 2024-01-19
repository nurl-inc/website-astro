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
                  We give you the tools to create and manage your groups, take
                  private and public notes, chat, and use tools from the
                  extension marketplace to enhance your game experience.
                </>
              }
            >
              Now you can focus on your character and telling their story.
              <br />
              <br />
              We give you (and your group) take public notes, chat, and use
              tools from the extension marketplace to enhance your game
              experience.
            </Show>
            <br />
            <br />
            Everything is powered by our proprietary AI engine Nuro&trade; to
            enhance your entire experience.
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
