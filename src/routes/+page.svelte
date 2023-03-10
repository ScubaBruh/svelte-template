<script>
  import { signIn } from "@auth/sveltekit/client";
  import { page } from "$app/stores";
</script>

<div class="pt-2 flex justify-center">
  <div class="max-w-sm w-80 p-4 flex flex-col items-center">
    <p class="my-4">
      This is the way you take out your flustrations. Work that paint. Little trees and bushes grow however makes them happy. All you need to paint is a few tools, a little instruction, and a vision in your mind. Don't hurry. Take your time and enjoy.
    </p>
    {#if $page.data.session}
      <p>{$page.data.session.user?.name ?? "User"} logged in</p>
    {:else}
      <button on:click={() => signIn('google')} class="btn variant-filled-primary">
        Sign up with Google
      </button>
    {/if}
  </div>
</div>
