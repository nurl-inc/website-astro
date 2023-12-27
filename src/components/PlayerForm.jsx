import { Show, createSignal } from "solid-js";

export function PlayerForm() {
  const [playerType, setPlayerType] = createSignal("");

  function handleSubmit(event) {
    event.preventDefault();
    setPlayerType(event.currentTarget.value);
  }

  return (
    <div class="center">
      <h4 class="center">
        What type of player are you?
        <Show when={playerType()}>
          <h5 class="uppercase player-type">{playerType()}</h5>
        </Show>
      </h4>
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
                  We give you the tools to create and manage your groups, chat,
                  take private and public notes, and use tools from the
                  extension marketplace to enhance your game experience.
                  <br />
                  <br />
                  We even use AI to enhance those tools and make them more
                  useful.
                </>
              }
            >
              Now you can focus on your character and telling their story.
              <br />
              <br />
              We give you (and your group) a place to chat, take public notes,
              and use tools from the extension marketplace to enhance your game
              experience.
              <br />
              <br />
              We even use AI to enhance those tools and make them more useful.
            </Show>
          </p>
        }
      >
        <div class="questionnaire">
          <button class="btn" value="player" onClick={handleSubmit}>
            Player
          </button>
          <button class="btn" value="gm" onClick={handleSubmit}>
            GM
          </button>
        </div>
      </Show>
    </div>
  );
}
