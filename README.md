# COSC 314 Final Project

Final Project for COSC 314 with George Cowan

This Repository contains a solution to Computer Projects #7 in Chapter 4 on page 327 of _Discrete Mathematics and Its Applications 8th Edition_

> Given two positive integers, find their least common multiple

## Program Design

### Theory

Traditionally the least common multiple (LCM) of a and b as being a \* b / the greatest common factor (GCF)

### My Algorithm

    P ≔ an infinite sequence of positive integers that includes all of the primes

    proc lcm(a ∈ Z+, b ∈ Z+)
        g ≔ 1;

        for n of P
            if n > a ∨ n > b
                exit for loop

            while a and b are divisible by n
                g ≔ g × n
                a ≔ a ÷ n
                b ≔ b ÷ n

        return a × b × g

### Implementation

you can see my implementation in [/src/factors.ts](./src/factors.ts) along with comments in the style of a proof of correctness.

## Running the Program

### Installing Deno

This project requires Deno. [Install Deno](https://deno.land/#installation)

### Running the Command

Once Deno is installed you can run this command from the terminal.

```
deno main.ts
```

## Contributing

### Testing the Program

to test the program's correctness run

```
deno test
```

to test the program's speed run

```
deno run .\src\factors.profile.ts
```

### Code Style

I use [Prettier](https://prettier.io/). If you are submitting a PR please try to follow the Prettier code styles but don't worry if you can't I would be happy to fix things up for you.

### VS Code

If you don't aleady have an IDE for writing typescript I recomend [VS Code](https://code.visualstudio.com/) with these extentions:

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Deno](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno)
