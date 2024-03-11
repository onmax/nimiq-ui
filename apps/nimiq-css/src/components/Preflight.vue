<template>
  <section p-6 ring ring-neutral-400 rounded> 
    <h2>Scrollbar</h2>
    <div mt-8  max-h-160px max-w-420px mx-auto of-auto prose class="scroll">
      <div pb-0="!">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad obcaecati ab, est, vero laborum ea enim dolores libero dolorem dicta ipsum deserunt amet sed recusandae voluptate repellat, molestiae doloribus? Assumenda!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad obcaecati ab, est, vero laborum ea enim dolores libero dolorem dicta ipsum deserunt amet sed recusandae voluptate repellat, molestiae doloribus? Assumenda!
        </p>
      </div>
    </div>
  </section>
  
    <section mt-8 p-6 ring ring-neutral-400 rounded> 
      <h2>Shadows</h2>
      <div flex="~ gap-8" mt-12>
        <div size-32 bg-neutral-200 rounded-2 shadow="[--nq-shadow]"></div>
        <div size-32 bg-neutral-200 rounded-2 shadow="[--nq-shadow-lg]"></div>
      </div>
    </section>

    <section mt-8 p-6 ring ring-neutral-400 rounded> 
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
        <div size-16 bg-gradient-blue rounded-2></div>
        <div size-16 bg-gradient-green rounded-2></div>
        <div size-16 bg-gradient-gold rounded-2></div>
        <div size-16 bg-gradient-red rounded-2></div>
        <div size-16 bg-gradient-orange rounded-2></div>
      </div>
    </section>
</template>


<style>


</style>
