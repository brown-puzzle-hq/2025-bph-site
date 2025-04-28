"use client";

import {
  TOCContext,
  useTOCContextValues,
  TOCSection,
  TableOfContents,
} from "../TableOfContents";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Page() {
  const values = useTOCContextValues();
  return (
    <TOCContext.Provider value={values}>
      <div className="flex h-full w-screen py-6">
        <div className="hidden h-screen p-8 md:block md:w-1/3 lg:w-1/4">
          <TableOfContents />
        </div>
        <div className="flex w-full px-4">
          <article className="prose prose-info w-full max-w-none">
            <h1>Wrapup</h1>
            <TOCSection sectionId={0} tocTitle="Placeholder" isFirst>
              <h2>Placeholder</h2>
            </TOCSection>
            <TOCSection sectionId={1} tocTitle="Placeholder" isFirst>
              <h2>Placeholder</h2>
            </TOCSection>
            <TOCSection sectionId={2} tocTitle="Statistics">
              <h2>Statistics</h2>
              {/* QUICK STATS */}
              <h3>Summary</h3>
              <Table className="my-0 w-fit">
                <TableHeader>
                  <TableRow className="hover:bg-inherit">
                    <TableHead className="text-main-header"></TableHead>
                    <TableHead className="text-main-header">
                      In Person
                    </TableHead>
                    <TableHead className="text-main-header">
                      Remote Box
                    </TableHead>
                    <TableHead className="text-main-header">Remote</TableHead>
                    <TableHead className="text-main-header">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="pointer-events-none">
                  <TableRow>
                    <TableHead className="text-main-header">Teams</TableHead>
                    <TableCell className="text-center">40</TableCell>
                    <TableCell className="text-center">49</TableCell>
                    <TableCell className="text-center">271</TableCell>
                    <TableCell className="text-center">360</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="text-main-header">
                      Finishers
                    </TableHead>
                    <TableCell className="text-center">12</TableCell>
                    <TableCell className="text-center">27</TableCell>
                    <TableCell className="text-center">47</TableCell>
                    <TableCell className="text-center">86</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="text-main-header">
                      Action Meta Solves
                    </TableHead>
                    <TableCell className="text-center">29</TableCell>
                    <TableCell className="text-center">38</TableCell>
                    <TableCell className="text-center">139</TableCell>
                    <TableCell className="text-center">206</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="text-main-header">
                      Participants
                    </TableHead>
                    <TableCell className="text-center">247</TableCell>
                    <TableCell className="text-center">129</TableCell>
                    <TableCell className="text-center">487</TableCell>
                    <TableCell className="text-center">863</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="text-main-header">Hints</TableHead>
                    <TableCell className="text-center">163</TableCell>
                    <TableCell className="text-center">205</TableCell>
                    <TableCell className="text-center">908</TableCell>
                    <TableCell className="text-center">1276</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="text-main-header">Guesses</TableHead>
                    <TableCell className="text-center">3751</TableCell>
                    <TableCell className="text-center">8172</TableCell>
                    <TableCell className="text-center">23521</TableCell>
                    <TableCell className="text-center">35444</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="text-main-header">Solves</TableHead>
                    <TableCell className="text-center">1118</TableCell>
                    <TableCell className="text-center">1936</TableCell>
                    <TableCell className="text-center">5343</TableCell>
                    <TableCell className="text-center">8397</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/* TEAM STATS */}
              {/* fewest guesses */}
              <h3>Fewest Guesses</h3>
              <Table className="my-0 w-fit">
                <TableHeader>
                  <TableRow className="hover:bg-inherit">
                    <TableHead className="text-main-header">
                      Display Name
                    </TableHead>
                    <TableHead className="text-main-header">
                      Guess Count*
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="pointer-events-none">
                  <TableRow>
                    <TableCell>Casabllama</TableCell>
                    <TableCell className="text-center">59</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>The Wob Blizzards</TableCell>
                    <TableCell className="text-center">105</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      The Greater Embarrassment Community Theater
                    </TableCell>
                    <TableCell className="text-center">105</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Living Off Hope</TableCell>
                    <TableCell className="text-center">115</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Husky Hunters</TableCell>
                    <TableCell className="text-center">124</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Cardinality</TableCell>
                    <TableCell className="text-center">129</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>plugh</TableCell>
                    <TableCell className="text-center">139</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Theatre Screen's Bright Illumination</TableCell>
                    <TableCell className="text-center">143</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Lefty</TableCell>
                    <TableCell className="text-center">146</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>come back to us later</TableCell>
                    <TableCell className="text-center">146</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <p className="text-sm text-main-header">
                *Includes PARTIALs and TASKs. Casabllama's solve was essentially
                flawless.
              </p>
              {/* most guesses */}
              <h3>Most Guesses</h3>
              <Table className="my-0 w-fit">
                <TableHeader>
                  <TableRow className="hover:bg-inherit">
                    <TableHead className="text-main-header">
                      Display Name
                    </TableHead>
                    <TableHead className="text-main-header">
                      Guess Count
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="pointer-events-none">
                  <TableRow>
                    <TableCell>🍓➡️🐢</TableCell>
                    <TableCell className="text-center">689</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Hunters Around The World</TableCell>
                    <TableCell className="text-center">684</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Cacheiras</TableCell>
                    <TableCell className="text-center">591</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>希望404</TableCell>
                    <TableCell className="text-center">469</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Les Gaulois</TableCell>
                    <TableCell className="text-center">460</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      AHAMILTON RB.GY/TC4L8X CCAPAC APU #1 FAN + friends
                    </TableCell>
                    <TableCell className="text-center">420</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>the riddlers</TableCell>
                    <TableCell className="text-center">419</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Puzzle Solution Doxxers</TableCell>
                    <TableCell className="text-center">414</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Amateur Hour</TableCell>
                    <TableCell className="text-center">399</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>何以为我</TableCell>
                    <TableCell className="text-center">393</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/* fewest hints */}
              <h3>Fewest Hints</h3>
              <Table className="my-0 w-fit">
                <TableHeader>
                  <TableRow className="hover:bg-inherit">
                    <TableHead className="text-main-header">
                      Display Name
                    </TableHead>
                    <TableHead className="text-main-header">
                      Hint Count
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="pointer-events-none">
                  <TableRow>
                    <TableCell>chat</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>C-t Fillers</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Casabllama</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Please Clap</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Double Award Nominee</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Living Off Hope</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Cardinality</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Ultimate Brownies</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Red Carpet Herrings 🎏</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Dreamer Spinning Suspended Disbelief</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      ⡫ I GUESS WE CAN'T ALL SIT NEXT TO EACH OTHER
                    </TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>SeptaCube</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>simplicissimus</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tricksters</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mobius Strippers</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/* most hints */}
              <h3>Most Hints</h3>
              <Table className="my-0 w-fit">
                <TableHeader>
                  <TableRow className="hover:bg-inherit">
                    <TableHead className="text-main-header">
                      Display Name
                    </TableHead>
                    <TableHead className="text-main-header">
                      Hint Count
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="pointer-events-none">
                  <TableRow>
                    <TableCell>Alteleid</TableCell>
                    <TableCell className="text-center">24</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>何以为我</TableCell>
                    <TableCell className="text-center">21</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>More About Vikings</TableCell>
                    <TableCell className="text-center">21</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Turtle Power</TableCell>
                    <TableCell className="text-center">20</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Hunters Around The World</TableCell>
                    <TableCell className="text-center">20</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Livin’ Covida Loca</TableCell>
                    <TableCell className="text-center">19</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Hong Kong Guy My</TableCell>
                    <TableCell className="text-center">19</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      Intervarsi-Teammate: Slowdown Showtime!
                    </TableCell>
                    <TableCell className="text-center">18</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Team Conundrum</TableCell>
                    <TableCell className="text-center">18</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Team Peggle</TableCell>
                    <TableCell className="text-center">18</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/* most hints + replies */}
              <h3>Most Hints + Replies</h3>
              <Table className="my-0 w-fit">
                <TableHeader>
                  <TableRow className="hover:bg-inherit">
                    <TableHead className="text-main-header">
                      Display Name
                    </TableHead>
                    <TableHead className="text-main-header">
                      Total Hint Count
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="pointer-events-none">
                  <TableRow>
                    <TableCell>Hunters Around The World</TableCell>
                    <TableCell className="text-center">58</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Alteleid</TableCell>
                    <TableCell className="text-center">53</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Livin’ Covida Loca</TableCell>
                    <TableCell className="text-center">43</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>the riddlers</TableCell>
                    <TableCell className="text-center">42</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Puzzle Solution Doxxers</TableCell>
                    <TableCell className="text-center">36</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>helppuzzles</TableCell>
                    <TableCell className="text-center">35</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>何以为我</TableCell>
                    <TableCell className="text-center">34</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Hong Kong Guy My</TableCell>
                    <TableCell className="text-center">32</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Maxwell Rose</TableCell>
                    <TableCell className="text-center">32</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>stɹeɪjə maɪt</TableCell>
                    <TableCell className="text-center">30</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/* PUZZLE STATS */}
              {/* primary stats */}
              <h3>Puzzle Statistics</h3>
              <Table className="my-0 w-fit">
                <TableHeader>
                  <TableRow className="hover:bg-inherit">
                    <TableHead className="text-main-header">Puzzle</TableHead>
                    <TableHead className="text-main-header">Guesses</TableHead>
                    <TableHead className="text-main-header">Solves</TableHead>
                    <TableHead className="text-main-header">
                      Backsolves
                    </TableHead>
                    <TableHead className="text-main-header">Hints</TableHead>
                    <TableHead className="text-main-header">
                      Hints + Replies
                    </TableHead>
                    <TableHead className="text-main-header">Tokens</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="pointer-events-none">
                  <TableRow>
                    <TableCell>a-fistful-of-cards</TableCell>
                    <TableCell className="text-center">350</TableCell>
                    <TableCell className="text-center">212</TableCell>
                    <TableCell className="text-center">85</TableCell>
                    <TableCell className="text-center">5</TableCell>
                    <TableCell className="text-center">5</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>a-fistful-of-cards-ii</TableCell>
                    <TableCell className="text-center">190</TableCell>
                    <TableCell className="text-center">158</TableCell>
                    <TableCell className="text-center">17</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>a-fistful-of-cards-iii</TableCell>
                    <TableCell className="text-center">184</TableCell>
                    <TableCell className="text-center">131</TableCell>
                    <TableCell className="text-center">15</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>a-fistful-of-cards-iv</TableCell>
                    <TableCell className="text-center">420</TableCell>
                    <TableCell className="text-center">95</TableCell>
                    <TableCell className="text-center">12</TableCell>
                    <TableCell className="text-center">23</TableCell>
                    <TableCell className="text-center">33</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>aha-erlebnis</TableCell>
                    <TableCell className="text-center">637</TableCell>
                    <TableCell className="text-center">138</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">35</TableCell>
                    <TableCell className="text-center">54</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>are-you-sure</TableCell>
                    <TableCell className="text-center">229</TableCell>
                    <TableCell className="text-center">145</TableCell>
                    <TableCell className="text-center">4</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>balloon-animals</TableCell>
                    <TableCell className="text-center">412</TableCell>
                    <TableCell className="text-center">179</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">10</TableCell>
                    <TableCell className="text-center">15</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>barbie</TableCell>
                    <TableCell className="text-center">230</TableCell>
                    <TableCell className="text-center">118</TableCell>
                    <TableCell className="text-center">19</TableCell>
                    <TableCell className="text-center">38</TableCell>
                    <TableCell className="text-center">58</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>beads</TableCell>
                    <TableCell className="text-center">579</TableCell>
                    <TableCell className="text-center">151</TableCell>
                    <TableCell className="text-center">27</TableCell>
                    <TableCell className="text-center">72</TableCell>
                    <TableCell className="text-center">112</TableCell>
                    <TableCell className="text-center">2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>bluenos-puzzle-box</TableCell>
                    <TableCell className="text-center">321</TableCell>
                    <TableCell className="text-center">124</TableCell>
                    <TableCell className="text-center">10</TableCell>
                    <TableCell className="text-center">14</TableCell>
                    <TableCell className="text-center">23</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>boring-plot</TableCell>
                    <TableCell className="text-center">191</TableCell>
                    <TableCell className="text-center">94</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">45</TableCell>
                    <TableCell className="text-center">72</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>chain-letters</TableCell>
                    <TableCell className="text-center">216</TableCell>
                    <TableCell className="text-center">136</TableCell>
                    <TableCell className="text-center">15</TableCell>
                    <TableCell className="text-center">23</TableCell>
                    <TableCell className="text-center">37</TableCell>
                    <TableCell className="text-center">3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>color-wheel</TableCell>
                    <TableCell className="text-center">338</TableCell>
                    <TableCell className="text-center">83</TableCell>
                    <TableCell className="text-center">11</TableCell>
                    <TableCell className="text-center">37</TableCell>
                    <TableCell className="text-center">56</TableCell>
                    <TableCell className="text-center">3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>connect-the-dots</TableCell>
                    <TableCell className="text-center">788</TableCell>
                    <TableCell className="text-center">194</TableCell>
                    <TableCell className="text-center">15</TableCell>
                    <TableCell className="text-center">37</TableCell>
                    <TableCell className="text-center">51</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>constellation</TableCell>
                    <TableCell className="text-center">472</TableCell>
                    <TableCell className="text-center">93</TableCell>
                    <TableCell className="text-center">3</TableCell>
                    <TableCell className="text-center">29</TableCell>
                    <TableCell className="text-center">39</TableCell>
                    <TableCell className="text-center">2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>cutting-room-floor</TableCell>
                    <TableCell className="text-center">400</TableCell>
                    <TableCell className="text-center">86</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">43</TableCell>
                    <TableCell className="text-center">62</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>drop-the</TableCell>
                    <TableCell className="text-center">297</TableCell>
                    <TableCell className="text-center">206</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">5</TableCell>
                    <TableCell className="text-center">8</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>eye-of-the-storm</TableCell>
                    <TableCell className="text-center">184</TableCell>
                    <TableCell className="text-center">127</TableCell>
                    <TableCell className="text-center">9</TableCell>
                    <TableCell className="text-center">30</TableCell>
                    <TableCell className="text-center">49</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>eye-spy</TableCell>
                    <TableCell className="text-center">4431</TableCell>
                    <TableCell className="text-center">108</TableCell>
                    <TableCell className="text-center">35</TableCell>
                    <TableCell className="text-center">16</TableCell>
                    <TableCell className="text-center">21</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>eye-to-eye</TableCell>
                    <TableCell className="text-center">124</TableCell>
                    <TableCell className="text-center">97</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">3</TableCell>
                    <TableCell className="text-center">6</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>filming-schedule</TableCell>
                    <TableCell className="text-center">337</TableCell>
                    <TableCell className="text-center">241</TableCell>
                    <TableCell className="text-center">7</TableCell>
                    <TableCell className="text-center">5</TableCell>
                    <TableCell className="text-center">5</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>financial-crimes-3</TableCell>
                    <TableCell className="text-center">272</TableCell>
                    <TableCell className="text-center">112</TableCell>
                    <TableCell className="text-center">13</TableCell>
                    <TableCell className="text-center">12</TableCell>
                    <TableCell className="text-center">17</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>find-ben</TableCell>
                    <TableCell className="text-center">603</TableCell>
                    <TableCell className="text-center">232</TableCell>
                    <TableCell className="text-center">22</TableCell>
                    <TableCell className="text-center">7</TableCell>
                    <TableCell className="text-center">8</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>fractal-shanty</TableCell>
                    <TableCell className="text-center">396</TableCell>
                    <TableCell className="text-center">163</TableCell>
                    <TableCell className="text-center">70</TableCell>
                    <TableCell className="text-center">31</TableCell>
                    <TableCell className="text-center">53</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>fridge-magnets</TableCell>
                    <TableCell className="text-center">207</TableCell>
                    <TableCell className="text-center">93</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">3</TableCell>
                    <TableCell className="text-center">4</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>genetic-counseling</TableCell>
                    <TableCell className="text-center">193</TableCell>
                    <TableCell className="text-center">111</TableCell>
                    <TableCell className="text-center">43</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">3</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>hand-letters</TableCell>
                    <TableCell className="text-center">167</TableCell>
                    <TableCell className="text-center">143</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">4</TableCell>
                    <TableCell className="text-center">6</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>heist</TableCell>
                    <TableCell className="text-center">405</TableCell>
                    <TableCell className="text-center">235</TableCell>
                    <TableCell className="text-center">60</TableCell>
                    <TableCell className="text-center">14</TableCell>
                    <TableCell className="text-center">16</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>heist-ii</TableCell>
                    <TableCell className="text-center">184</TableCell>
                    <TableCell className="text-center">164</TableCell>
                    <TableCell className="text-center">6</TableCell>
                    <TableCell className="text-center">4</TableCell>
                    <TableCell className="text-center">5</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>heist-iii</TableCell>
                    <TableCell className="text-center">186</TableCell>
                    <TableCell className="text-center">143</TableCell>
                    <TableCell className="text-center">10</TableCell>
                    <TableCell className="text-center">5</TableCell>
                    <TableCell className="text-center">8</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>identify-the-piece</TableCell>
                    <TableCell className="text-center">4249</TableCell>
                    <TableCell className="text-center">131</TableCell>
                    <TableCell className="text-center">8</TableCell>
                    <TableCell className="text-center">30</TableCell>
                    <TableCell className="text-center">51</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>imagine</TableCell>
                    <TableCell className="text-center">332</TableCell>
                    <TableCell className="text-center">108</TableCell>
                    <TableCell className="text-center">21</TableCell>
                    <TableCell className="text-center">34</TableCell>
                    <TableCell className="text-center">45</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>international-neighbours</TableCell>
                    <TableCell className="text-center">769</TableCell>
                    <TableCell className="text-center">117</TableCell>
                    <TableCell className="text-center">61</TableCell>
                    <TableCell className="text-center">64</TableCell>
                    <TableCell className="text-center">104</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>like-clockwork</TableCell>
                    <TableCell className="text-center">495</TableCell>
                    <TableCell className="text-center">93</TableCell>
                    <TableCell className="text-center">3</TableCell>
                    <TableCell className="text-center">53</TableCell>
                    <TableCell className="text-center">71</TableCell>
                    <TableCell className="text-center">3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>lost-lyric</TableCell>
                    <TableCell className="text-center">355</TableCell>
                    <TableCell className="text-center">157</TableCell>
                    <TableCell className="text-center">28</TableCell>
                    <TableCell className="text-center">39</TableCell>
                    <TableCell className="text-center">49</TableCell>
                    <TableCell className="text-center">2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>m-guards-n-doors-and-k-choices</TableCell>
                    <TableCell className="text-center">707</TableCell>
                    <TableCell className="text-center">156</TableCell>
                    <TableCell className="text-center">30</TableCell>
                    <TableCell className="text-center">9</TableCell>
                    <TableCell className="text-center">13</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>narcissism</TableCell>
                    <TableCell className="text-center">360</TableCell>
                    <TableCell className="text-center">147</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>one-guard-screen</TableCell>
                    <TableCell className="text-center">540</TableCell>
                    <TableCell className="text-center">177</TableCell>
                    <TableCell className="text-center">12</TableCell>
                    <TableCell className="text-center">126</TableCell>
                    <TableCell className="text-center">159</TableCell>
                    <TableCell className="text-center">4</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>opening-sequences</TableCell>
                    <TableCell className="text-center">700</TableCell>
                    <TableCell className="text-center">143</TableCell>
                    <TableCell className="text-center">32</TableCell>
                    <TableCell className="text-center">15</TableCell>
                    <TableCell className="text-center">24</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>peanuts</TableCell>
                    <TableCell className="text-center">302</TableCell>
                    <TableCell className="text-center">224</TableCell>
                    <TableCell className="text-center">5</TableCell>
                    <TableCell className="text-center">5</TableCell>
                    <TableCell className="text-center">7</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>piecemeal</TableCell>
                    <TableCell className="text-center">274</TableCell>
                    <TableCell className="text-center">149</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">28</TableCell>
                    <TableCell className="text-center">36</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>plagiarism</TableCell>
                    <TableCell className="text-center">726</TableCell>
                    <TableCell className="text-center">221</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">14</TableCell>
                    <TableCell className="text-center">15</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>red-blue</TableCell>
                    <TableCell className="text-center">382</TableCell>
                    <TableCell className="text-center">88</TableCell>
                    <TableCell className="text-center">9</TableCell>
                    <TableCell className="text-center">33</TableCell>
                    <TableCell className="text-center">55</TableCell>
                    <TableCell className="text-center">3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>secret-ingredient</TableCell>
                    <TableCell className="text-center">190</TableCell>
                    <TableCell className="text-center">121</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">3</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>six-degrees</TableCell>
                    <TableCell className="text-center">5307</TableCell>
                    <TableCell className="text-center">128</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">26</TableCell>
                    <TableCell className="text-center">32</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>sound-of-music</TableCell>
                    <TableCell className="text-center">152</TableCell>
                    <TableCell className="text-center">98</TableCell>
                    <TableCell className="text-center">14</TableCell>
                    <TableCell className="text-center">4</TableCell>
                    <TableCell className="text-center">5</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ten-guards-ten-doors</TableCell>
                    <TableCell className="text-center">953</TableCell>
                    <TableCell className="text-center">208</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">37</TableCell>
                    <TableCell className="text-center">52</TableCell>
                    <TableCell className="text-center">3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>the-compact-disc</TableCell>
                    <TableCell className="text-center">534</TableCell>
                    <TableCell className="text-center">87</TableCell>
                    <TableCell className="text-center">24</TableCell>
                    <TableCell className="text-center">40</TableCell>
                    <TableCell className="text-center">66</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>the-final-heist</TableCell>
                    <TableCell className="text-center">214</TableCell>
                    <TableCell className="text-center">93</TableCell>
                    <TableCell className="text-center">6</TableCell>
                    <TableCell className="text-center">7</TableCell>
                    <TableCell className="text-center">7</TableCell>
                    <TableCell className="text-center">2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>the-guard-and-the-door</TableCell>
                    <TableCell className="text-center">778</TableCell>
                    <TableCell className="text-center">138</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">51</TableCell>
                    <TableCell className="text-center">79</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>the-snack-zone</TableCell>
                    <TableCell className="text-center">156</TableCell>
                    <TableCell className="text-center">136</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>two-guards-river</TableCell>
                    <TableCell className="text-center">246</TableCell>
                    <TableCell className="text-center">246</TableCell>
                    <TableCell className="text-center">0</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">3</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>two-guards-two-doors</TableCell>
                    <TableCell className="text-center">782</TableCell>
                    <TableCell className="text-center">286</TableCell>
                    <TableCell className="text-center">5</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>walk-of-fame</TableCell>
                    <TableCell className="text-center">889</TableCell>
                    <TableCell className="text-center">184</TableCell>
                    <TableCell className="text-center">67</TableCell>
                    <TableCell className="text-center">50</TableCell>
                    <TableCell className="text-center">62</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>watching-between-the-lines</TableCell>
                    <TableCell className="text-center">458</TableCell>
                    <TableCell className="text-center">158</TableCell>
                    <TableCell className="text-center">43</TableCell>
                    <TableCell className="text-center">35</TableCell>
                    <TableCell className="text-center">41</TableCell>
                    <TableCell className="text-center">3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>whats-my-ride</TableCell>
                    <TableCell className="text-center">362</TableCell>
                    <TableCell className="text-center">131</TableCell>
                    <TableCell className="text-center">34</TableCell>
                    <TableCell className="text-center">8</TableCell>
                    <TableCell className="text-center">9</TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>youve-got-this-covered</TableCell>
                    <TableCell className="text-center">289</TableCell>
                    <TableCell className="text-center">160</TableCell>
                    <TableCell className="text-center">22</TableCell>
                    <TableCell className="text-center">3</TableCell>
                    <TableCell className="text-center">4</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/* secondary stats */}
              <h3>Common Incorrect Answers</h3>
              <Table className="my-0 w-fit">
                <TableHeader>
                  <TableRow className="hover:bg-inherit">
                    <TableHead className="text-main-header">Puzzle</TableHead>
                    <TableHead className="text-main-header">
                      Top Incorrect
                    </TableHead>
                    <TableHead className="text-main-header">
                      Relative Frequency
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="pointer-events-none">
                  <TableRow>
                    <TableCell>identify-the-piece</TableCell>
                    <TableCell>LITTLEFUGUE</TableCell>
                    <TableCell className="text-center">116.0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>imagine</TableCell>
                    <TableCell>APOLOGIZE</TableCell>
                    <TableCell className="text-center">108.3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>eye-spy</TableCell>
                    <TableCell>PROVIDENCE</TableCell>
                    <TableCell className="text-center">96.3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>six-degrees</TableCell>
                    <TableCell>DANIELRADCLIFFE</TableCell>
                    <TableCell className="text-center">90.6</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>narcissism</TableCell>
                    <TableCell>SUPERIOR</TableCell>
                    <TableCell className="text-center">90.5</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>connect-the-dots</TableCell>
                    <TableCell>SHAPES</TableCell>
                    <TableCell className="text-center">89.7</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>aha-erlebnis</TableCell>
                    <TableCell>GEFUHLPROOF</TableCell>
                    <TableCell className="text-center">86.2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>plagiarism</TableCell>
                    <TableCell>CHILLEST</TableCell>
                    <TableCell className="text-center">73.8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>m-guards-n-doors-and-k-choices</TableCell>
                    <TableCell>PULLEYS</TableCell>
                    <TableCell className="text-center">52.6</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>international-neighbours</TableCell>
                    <TableCell>FAVORITE</TableCell>
                    <TableCell className="text-center">51.3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>the-final-heist</TableCell>
                    <TableCell>BLIND</TableCell>
                    <TableCell className="text-center">43.0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>two-guards-two-doors</TableCell>
                    <TableCell>STEERS</TableCell>
                    <TableCell className="text-center">38.8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ten-guards-ten-doors</TableCell>
                    <TableCell>SIX</TableCell>
                    <TableCell className="text-center">35.6</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>whats-my-ride</TableCell>
                    <TableCell>APOLLO</TableCell>
                    <TableCell className="text-center">33.6</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>opening-sequences</TableCell>
                    <TableCell>PAWNTOFF</TableCell>
                    <TableCell className="text-center">28.7</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>like-clockwork</TableCell>
                    <TableCell>ORANGE</TableCell>
                    <TableCell className="text-center">26.9</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>cutting-room-floor</TableCell>
                    <TableCell>BILLY</TableCell>
                    <TableCell className="text-center">26.7</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>lost-lyric</TableCell>
                    <TableCell>SUNDAY</TableCell>
                    <TableCell className="text-center">25.5</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>find-ben</TableCell>
                    <TableCell>MUSEUM</TableCell>
                    <TableCell className="text-center">25.4</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>red-blue</TableCell>
                    <TableCell>DATE</TableCell>
                    <TableCell className="text-center">25.0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>the-compact-disc</TableCell>
                    <TableCell>KUWAIT</TableCell>
                    <TableCell className="text-center">21.8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>beads</TableCell>
                    <TableCell>PRESS</TableCell>
                    <TableCell className="text-center">19.2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>walk-of-fame</TableCell>
                    <TableCell>CRUZ</TableCell>
                    <TableCell className="text-center">16.3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>the-guard-and-the-door</TableCell>
                    <TableCell>ACTOR</TableCell>
                    <TableCell className="text-center">15.9</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>one-guard-screen</TableCell>
                    <TableCell>DOUBLESLIT</TableCell>
                    <TableCell className="text-center">15.8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>youve-got-this-covered</TableCell>
                    <TableCell>DAY</TableCell>
                    <TableCell className="text-center">15.0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>boring-plot</TableCell>
                    <TableCell>EXTRACTION</TableCell>
                    <TableCell className="text-center">13.8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>color-wheel</TableCell>
                    <TableCell>FENNEL</TableCell>
                    <TableCell className="text-center">13.3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>watching-between-the-lines</TableCell>
                    <TableCell>BATESEED</TableCell>
                    <TableCell className="text-center">12.7</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>barbie</TableCell>
                    <TableCell>CHATTYKATHY</TableCell>
                    <TableCell className="text-center">11.9</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>fridge-magnets</TableCell>
                    <TableCell>DIREAP</TableCell>
                    <TableCell className="text-center">10.8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>sound-of-music</TableCell>
                    <TableCell>CYANOCOCCUSNINE</TableCell>
                    <TableCell className="text-center">10.2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>constellation</TableCell>
                    <TableCell>DURIAN</TableCell>
                    <TableCell className="text-center">9.7</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>chain-letters</TableCell>
                    <TableCell>THEGATHERINGSTORM</TableCell>
                    <TableCell className="text-center">8.8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>piecemeal</TableCell>
                    <TableCell>TEXTALIEN</TableCell>
                    <TableCell className="text-center">8.7</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>heist</TableCell>
                    <TableCell>FLOORPLANBROWN</TableCell>
                    <TableCell className="text-center">8.5</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>a-fistful-of-cards-iv</TableCell>
                    <TableCell>ORANGE</TableCell>
                    <TableCell className="text-center">8.4</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>balloon-animals</TableCell>
                    <TableCell>REALPOPMUSIC</TableCell>
                    <TableCell className="text-center">8.4</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>filming-schedule</TableCell>
                    <TableCell>BANNED</TableCell>
                    <TableCell className="text-center">5.8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>a-fistful-of-cards</TableCell>
                    <TableCell>GRI</TableCell>
                    <TableCell className="text-center">5.7</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>eye-to-eye</TableCell>
                    <TableCell>MIRRORS</TableCell>
                    <TableCell className="text-center">5.2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>secret-ingredient</TableCell>
                    <TableCell>OASISSAND</TableCell>
                    <TableCell className="text-center">5.0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>drop-the</TableCell>
                    <TableCell>OLDERIDEAS</TableCell>
                    <TableCell className="text-center">4.9</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>fractal-shanty</TableCell>
                    <TableCell>MERFOLK</TableCell>
                    <TableCell className="text-center">4.3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>bluenos-puzzle-box</TableCell>
                    <TableCell>WHEELING</TableCell>
                    <TableCell className="text-center">4.0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>genetic-counseling</TableCell>
                    <TableCell>JOLENE</TableCell>
                    <TableCell className="text-center">3.6</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>financial-crimes-3</TableCell>
                    <TableCell>ACTORSEQUITYPRIVATEFIRM</TableCell>
                    <TableCell className="text-center">3.6</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>a-fistful-of-cards-ii</TableCell>
                    <TableCell>SPRING</TableCell>
                    <TableCell className="text-center">3.2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>eye-of-the-storm</TableCell>
                    <TableCell>TROPICS</TableCell>
                    <TableCell className="text-center">3.1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>peanuts</TableCell>
                    <TableCell>PROTOHUMAN</TableCell>
                    <TableCell className="text-center">2.7</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>heist-ii</TableCell>
                    <TableCell>SPRING</TableCell>
                    <TableCell className="text-center">2.4</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>a-fistful-of-cards-iii</TableCell>
                    <TableCell>FIGHTLE</TableCell>
                    <TableCell className="text-center">2.3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>hand-letters</TableCell>
                    <TableCell>LUNULE</TableCell>
                    <TableCell className="text-center">2.1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>are-you-sure</TableCell>
                    <TableCell>COMBINATION</TableCell>
                    <TableCell className="text-center">2.1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>the-snack-zone</TableCell>
                    <TableCell>SAUVINGNON</TableCell>
                    <TableCell className="text-center">1.5</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>heist-iii</TableCell>
                    <TableCell>IMPOSSIBLE</TableCell>
                    <TableCell className="text-center">1.4</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/* MISCELLANEOUS STATS */}
              {/* first solves */}
              <h3>First Solves</h3>
              <Table className="my-0 w-fit">
                <TableHeader>
                  <TableRow className="hover:bg-inherit">
                    <TableHead className="text-main-header"></TableHead>
                    <TableHead className="text-main-header">Puzzle</TableHead>
                    <TableHead className="text-main-header">
                      Display Name
                    </TableHead>
                    <TableHead className="text-main-header">
                      Time After Start
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="pointer-events-none">
                  <TableRow>
                    <TableCell>In Person</TableCell>
                    <TableCell>walk-of-fame</TableCell>
                    <TableCell>meowmeow</TableCell>
                    <TableCell>0m 14.178s</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Remote Box</TableCell>
                    <TableCell>two-guards-two-doors</TableCell>
                    <TableCell>
                      ✈✈✈ galactic procrastinators ✈✈✈
                    </TableCell>
                    <TableCell>5m 0.897s</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Remote</TableCell>
                    <TableCell>two-guards-two-doors</TableCell>
                    <TableCell>Theatre Screen's Bright Illumination</TableCell>
                    <TableCell>7m 20.635s</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/* longest guesses */}
              <h3>Longest Guesses</h3>
              <Table className="my-0 w-fit">
                <TableHeader>
                  <TableRow className="hover:bg-inherit">
                    <TableHead className="text-main-header">Guess</TableHead>
                    <TableHead className="text-main-header">Length</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="pointer-events-none">
                  <TableRow>
                    <TableCell>
                      THISISJUSTANAAOCTAVEASTHEBASSPARTANDITSBEENSHORTENEDABUNCHANDTHEREABIGGAPHEREIDKWHATELSEYOUWANT
                    </TableCell>
                    <TableCell className="text-center">95</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      OOOOOOOOOOOAAAAEAAIAUJOOOOOOOOOOOOOAAEOAAUUAEEEEEEEEEAAAAEAEIEAJOOOOOOOOOOEEEEOAAAAAAAA
                    </TableCell>
                    <TableCell className="text-center">87</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      ASIFWALTZBYGEORDIEGREEPLISTENTOTHENEWSOUNDTODAYTHEBESTALBUMOFTWENTYTWENTYFOUR
                    </TableCell>
                    <TableCell className="text-center">77</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      FUNFACTTHERAFSTARTEDTHECARROTSMYTHWHENWHATTHEIRPILOTSACTUALLYHADWASRADAR
                    </TableCell>
                    <TableCell className="text-center">72</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      HTTPSWWWBROWNPUZZLEHUNTCOMNEXTIMAGEURLFNEXTFSTATICFMEDIAFSNACKBEJPGWQ
                    </TableCell>
                    <TableCell className="text-center">69</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      AARGHWHICHISTHERIGHTSHAKESPEARESOURCETHATMATCHESYOURLINENUMBERS
                    </TableCell>
                    <TableCell className="text-center">63</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      SINKCALPUREVLIGOLINDIGOLINDIHWOLPRELACKNIDNIGOLINKCALISETILE
                    </TableCell>
                    <TableCell className="text-center">60</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      ATLEASTWITHTHEPREVIOUSONEYOUCANGETITFROMNUTRIMATICWITHETUDES
                    </TableCell>
                    <TableCell className="text-center">60</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      WHEREDIDICOMEFROMWHEREDIDIGOWHEREDIDICOMEFROMCOTTONEYEDJOE
                    </TableCell>
                    <TableCell className="text-center">58</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      WAITISITJUSTNORMALMONTYHALLANDWEDONTCAREABOUTTHEBULLCRAP
                    </TableCell>
                    <TableCell className="text-center">56</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      IDKWHATTHISPUZZLEISABOUTBUTILOVETHELONGESTJOHNSYAY
                    </TableCell>
                    <TableCell className="text-center">50</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      THERESNOPUZZLEHEREJUSTFUCKINGFLAVORTEXTWHATTHEFUCK
                    </TableCell>
                    <TableCell className="text-center">50</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      LETSWATCHEXPERTSTRYTOPUZZLEATSOMERIDDLESINADESERT
                    </TableCell>
                    <TableCell className="text-center">49</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      LETSWATCHEXPERTSTRYTOPUZZLEATSOMERIDDLESINADESERT
                    </TableCell>
                    <TableCell className="text-center">49</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      LETSWATCHEXPERTSTRYTOPUZZLEATSOMERIDDLESINADESERT
                    </TableCell>
                    <TableCell className="text-center">49</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      LETSWATCHEXPERTSTRYTOPUZZLEATSOMERIDDLESINADESERT
                    </TableCell>
                    <TableCell className="text-center">49</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      IFYOUWANTMETOSTOPSENDMEADMITSPROCYONINPUZZLEWORLD
                    </TableCell>
                    <TableCell className="text-center">49</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      LETSWATCHEXPERTSTRYTOPUZZLEATSOMERIDDLESINADESERT
                    </TableCell>
                    <TableCell className="text-center">49</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      LETSWATCHEXPERTSTRYTOPUZZLEATSOMERIDDLESINADESERT
                    </TableCell>
                    <TableCell className="text-center">49</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      LETSWATCHEXPERTSTRYTOPUZZLEATSOMERIDDLESINADESERT
                    </TableCell>
                    <TableCell className="text-center">49</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      LETSWATCHEXPERTSTRYTOPUZZLEATSOMERIDDLESINADESERT
                    </TableCell>
                    <TableCell className="text-center">49</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      LETSWATCHEXPERTSTRYTOPUZZLEATSOMERIDDLESINADESERT
                    </TableCell>
                    <TableCell className="text-center">49</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      LETSWATCHEXPERTSTRYTOPUZZLEATSOMERIDDLESINADESERT
                    </TableCell>
                    <TableCell className="text-center">49</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      LETSWATCHEXPERTSTRYTOPUZZLEATSOMERIDDLESINADESERT
                    </TableCell>
                    <TableCell className="text-center">49</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      LETSWATCHEXPERTSTRYTOPUZZLEATSOMERIDDLESINADESERT
                    </TableCell>
                    <TableCell className="text-center">49</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/* one-letter guesses */}
              <h3>One-Letter Guesses</h3>
              <Table className="my-0 w-fit">
                <TableHeader>
                  <TableRow className="hover:bg-inherit">
                    <TableHead className="text-center text-main-header">
                      I
                    </TableHead>
                    <TableHead className="text-main-header">O</TableHead>
                    <TableHead className="text-main-header">R</TableHead>
                    <TableHead className="text-main-header">A</TableHead>
                    <TableHead className="text-main-header">U</TableHead>
                    <TableHead className="text-main-header">E</TableHead>
                    <TableHead className="text-main-header">B</TableHead>
                    <TableHead className="text-main-header">C</TableHead>
                    <TableHead className="text-main-header">D</TableHead>
                    <TableHead className="text-main-header">V</TableHead>
                    <TableHead className="text-main-header">G</TableHead>
                    <TableHead className="text-main-header">H</TableHead>
                    <TableHead className="text-main-header">M</TableHead>
                    <TableHead className="text-main-header">Y</TableHead>
                    <TableHead className="text-main-header">S</TableHead>
                    <TableHead className="text-main-header">X</TableHead>
                    <TableHead className="text-main-header">K</TableHead>
                    <TableHead className="text-main-header">N</TableHead>
                    <TableHead className="text-main-header">F</TableHead>
                    <TableHead className="text-main-header">J</TableHead>
                    <TableHead className="text-main-header">L</TableHead>
                    <TableHead className="text-main-header">P</TableHead>
                    <TableHead className="text-main-header">Q</TableHead>
                    <TableHead className="text-main-header">T</TableHead>
                    <TableHead className="text-main-header">W</TableHead>
                    <TableHead className="text-main-header">Z</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="pointer-events-none">
                  <TableRow className="hover:bg-inherit">
                    <TableCell className="text-center">13</TableCell>
                    <TableCell className="text-center">9</TableCell>
                    <TableCell className="text-center">8</TableCell>
                    <TableCell className="text-center">8</TableCell>
                    <TableCell className="text-center">7</TableCell>
                    <TableCell className="text-center">4</TableCell>
                    <TableCell className="text-center">4</TableCell>
                    <TableCell className="text-center">4</TableCell>
                    <TableCell className="text-center">4</TableCell>
                    <TableCell className="text-center">3</TableCell>
                    <TableCell className="text-center">3</TableCell>
                    <TableCell className="text-center">3</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">1</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/* shortest hints */}
              <h3>Shortest Hint Requests</h3>
              <Table className="my-0 w-fit">
                <TableHeader>
                  <TableRow className="hover:bg-inherit">
                    <TableHead className="text-main-header">Request</TableHead>
                    <TableHead className="text-main-header">Length</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="pointer-events-none">
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell className="text-center">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>jk\n</TableCell>
                    <TableCell className="text-center">3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>GIARRE</TableCell>
                    <TableCell className="text-center">6</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>no clue</TableCell>
                    <TableCell className="text-center">7</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>CHILLEST</TableCell>
                    <TableCell className="text-center">8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Hint on start</TableCell>
                    <TableCell className="text-center">13</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ignore this\n\n</TableCell>
                    <TableCell className="text-center">13</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>What does BLUENO mean?</TableCell>
                    <TableCell className="text-center">23</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>is it related to course timings?\n</TableCell>
                    <TableCell className="text-center">33</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>We're not sure where to start here</TableCell>
                    <TableCell className="text-center">34</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <h3>Events</h3>
              <Table className="my-0 w-fit">
                <TableHeader>
                  <TableRow className="hover:bg-inherit">
                    <TableHead className="text-main-header"></TableHead>
                    <TableHead className="text-main-header">
                      Submitted
                    </TableHead>
                    <TableHead className="text-main-header">Used</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="pointer-events-none">
                  <TableRow>
                    <TableHead className="text-main-header">
                      auditioning-for-a-role
                    </TableHead>
                    <TableCell className="text-center">23</TableCell>
                    <TableCell className="text-center">22</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="text-main-header">
                      poster-pastiche
                    </TableHead>
                    <TableCell className="text-center">18</TableCell>
                    <TableCell className="text-center">16</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="text-main-header">
                      sneaking-a-screening
                    </TableHead>
                    <TableCell className="text-center">16</TableCell>
                    <TableCell className="text-center">15</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TOCSection>
          </article>
        </div>
      </div>
    </TOCContext.Provider>
  );
}
