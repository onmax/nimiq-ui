<template>
  <section p-6 border-base rounded>
    <h2>Scrollbar</h2>
    <div flex="~">

      <div mt-8 max-h-160px max-w-420px mx-auto of-auto prose>
        <h3 mt-0>Default scrollbar</h3>
        <div pb-0>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad obcaecati ab, est, vero laborum ea enim dolores
            libero dolorem dicta ipsum deserunt amet sed recusandae voluptate repellat, molestiae doloribus? Assumenda!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad obcaecati ab, est, vero laborum ea enim dolores
            libero dolorem dicta ipsum deserunt amet sed recusandae voluptate repellat, molestiae doloribus? Assumenda!
          </p>
        </div>
      </div>
      <div mt-8 max-h-160px max-w-420px mx-auto of-auto prose class="scroll-sm">
        <h3 mt-0><code>scroll-sm</code> scrollbar</h3>
        <div pb-0>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad obcaecati ab, est, vero laborum ea enim dolores
            libero dolorem dicta ipsum deserunt amet sed recusandae voluptate repellat, molestiae doloribus? Assumenda!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad obcaecati ab, est, vero laborum ea enim dolores
            libero dolorem dicta ipsum deserunt amet sed recusandae voluptate repellat, molestiae doloribus? Assumenda!
          </p>
        </div>
      </div>
    </div>
  </section>

  <section mt-8 p-6 border-base rounded>
    <h2>Shadows</h2>
    <div flex="~ gap-8" mt-12>
      <div size-32 bg-neutral-200 rounded-2 shadow></div>
      <div size-32 bg-neutral-200 rounded-2 shadow-lg></div>
    </div>
  </section>

  <section mt-8 p-6 border-base rounded>
    <h2>Colors</h2>

    <label label>Note</label>
    <p>
      Colors change when you change the theme (light/dark)
    </p>

    <h3 mt-4>Flat</h3>
    <div flex="~ gap-8">
      <div size-16 bg-neutral rounded-2></div>
      <div size-16 bg-blue rounded-2></div>
      <div size-16 bg-green rounded-2></div>
      <div size-16 bg-gold rounded-2></div>
      <div size-16 bg-red rounded-2></div>
      <div size-16 bg-orange rounded-2></div>
      <div size-16 bg-purple rounded-2></div>
    </div>

    <h3 mt-4>Gradients</h3>
    <div flex="~ gap-8">
      <div size-16 bg-gradient-neutral rounded-2></div>
      <div size-16 bg-gradient-blue="~ hover:darkened" transition-colors rounded-2></div>
      <div size-16 bg-gradient-green="~ hover:darkened" transition-colors rounded-2></div>
      <div size-16 bg-gradient-gold="~ hover:darkened" transition-colors rounded-2></div>
      <div size-16 bg-gradient-red="~ hover:darkened" transition-colors rounded-2></div>
      <div size-16 bg-gradient-orange="~ hover:darkened" transition-colors rounded-2></div>
    </div>
  </section>
</template>


<style></style>
