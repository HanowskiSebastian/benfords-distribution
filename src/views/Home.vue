<template>
  <base-section>
    <header>
      <h1>Benford's law</h1>
    </header>
    <article>
      <blockquote
        class="blockquote"
        cite="https://en.wikipedia.org/wiki/Benford%27s_law"
      >
        <p>
          Benford's law, also called the Newcomb–Benford law, the law of
          anomalous numbers, or the first-digit law, is an observation about the
          frequency distribution of leading digits in many real-life sets of
          numerical data. The law states that in many naturally occurring
          collections of numbers, the leading digit is likely to be small. In
          sets that obey the law, the number 1 appears as the leading
          significant digit about 30% of the time, while 9 appears as the
          leading significant digit less than 5% of the time. If the digits were
          distributed uniformly, they would each occur about 11.1% of the time.
          Benford's law also makes predictions about the distribution of second
          digits, third digits, digit combinations, and so on.
        </p>
        <footer class="blockquote-footer">
          From
          <cite title="Wikipedia, the free encyclopedia"
            >Wikipedia, the free encyclopedia</cite
          >
        </footer>
      </blockquote>
    </article>
  </base-section>
  <base-section>
    <p>Click the button to upload the file containing data to check.</p>
    <router-link class="btn btn-primary" to="/upload"
      >Go upload file!</router-link
    >
  </base-section>
</template>