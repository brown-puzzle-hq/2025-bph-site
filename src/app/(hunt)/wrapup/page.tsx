import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function Home() {
  return (
    <div className="mb-12 px-4 pt-6">
      <h1 className="mb-2 text-center">Wrapup</h1>
      {/* QUICK STATS */}
      <Table className="mx-auto w-fit">
        <TableHeader>
          <TableRow className="hover:bg-inherit">
            <TableHead className="text-main-header"></TableHead>
            <TableHead className="text-main-header">in-person</TableHead>
            <TableHead className="text-main-header">remote-box</TableHead>
            <TableHead className="text-main-header">remote</TableHead>
            <TableHead className="text-main-header">total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="pointer-events-none">
          <TableRow>
            <TableHead className="text-main-header">teams</TableHead>
            <TableCell>40</TableCell>
            <TableCell>49</TableCell>
            <TableCell>271</TableCell>
            <TableCell>360</TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="text-main-header">finishers</TableHead>
            <TableCell>12</TableCell>
            <TableCell>27</TableCell>
            <TableCell>47</TableCell>
            <TableCell>86</TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="text-main-header">
              action meta solves
            </TableHead>
            <TableCell>29</TableCell>
            <TableCell>38</TableCell>
            <TableCell>139</TableCell>
            <TableCell>206</TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="text-main-header">participants</TableHead>
            <TableCell>247</TableCell>
            <TableCell>129</TableCell>
            <TableCell>487</TableCell>
            <TableCell>863</TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="text-main-header">hints asked</TableHead>
            <TableCell>163</TableCell>
            <TableCell>205</TableCell>
            <TableCell>908</TableCell>
            <TableCell>1276</TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="text-main-header">guesses</TableHead>
            <TableCell>3751</TableCell>
            <TableCell>8172</TableCell>
            <TableCell>23521</TableCell>
            <TableCell>35444</TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="text-main-header">solves</TableHead>
            <TableCell>1118</TableCell>
            <TableCell>1936</TableCell>
            <TableCell>5343</TableCell>
            <TableCell>8397</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/* TEAM STATS */}
      {/* fewest guesses */}
      <Table className="mx-auto w-fit">
        <TableHeader>
          <TableRow className="hover:bg-inherit">
            <TableHead className="text-main-header">display_name</TableHead>
            <TableHead className="text-main-header">guess_count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="pointer-events-none">
          <TableRow>
            <TableCell>Casabllama</TableCell>
            <TableCell>59</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>The Wob Blizzards</TableCell>
            <TableCell>105</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>The Greater Embarrassment Community Theater</TableCell>
            <TableCell>105</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Living Off Hope</TableCell>
            <TableCell>115</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Husky Hunters</TableCell>
            <TableCell>124</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cardinality</TableCell>
            <TableCell>129</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>plugh</TableCell>
            <TableCell>139</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Theatre Screen's Bright Illumination</TableCell>
            <TableCell>143</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Lefty</TableCell>
            <TableCell>146</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>come back to us later</TableCell>
            <TableCell>146</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/* most guesses */}
      <Table className="mx-auto w-fit">
        <TableHeader>
          <TableRow className="hover:bg-inherit">
            <TableHead className="text-main-header">display_name</TableHead>
            <TableHead className="text-main-header">guess_count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="pointer-events-none">
          <TableRow>
            <TableCell>🍓➡️🐢</TableCell>
            <TableCell>689</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Hunters Around The World</TableCell>
            <TableCell>684</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cacheiras</TableCell>
            <TableCell>591</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>希望404</TableCell>
            <TableCell>469</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Les Gaulois</TableCell>
            <TableCell>460</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              AHAMILTON RB.GY/TC4L8X CCAPAC APU #1 FAN + friends
            </TableCell>
            <TableCell>420</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>the riddlers</TableCell>
            <TableCell>419</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Puzzle Solution Doxxers</TableCell>
            <TableCell>414</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Amateur Hour</TableCell>
            <TableCell>399</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>何以为我</TableCell>
            <TableCell>393</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/* fewest hints */}
      <Table className="mx-auto w-fit">
        <TableHeader>
          <TableRow className="hover:bg-inherit">
            <TableHead className="text-main-header">display_name</TableHead>
            <TableHead className="text-main-header">hint_count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="pointer-events-none">
          <TableRow>
            <TableCell>chat</TableCell>
            <TableCell>0</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>C-t Fillers</TableCell>
            <TableCell>0</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Casabllama</TableCell>
            <TableCell>0</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Please Clap</TableCell>
            <TableCell>0</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Double Award Nominee</TableCell>
            <TableCell>0</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Living Off Hope</TableCell>
            <TableCell>0</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cardinality</TableCell>
            <TableCell>0</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ultimate Brownies</TableCell>
            <TableCell>0</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Red Carpet Herrings 🎏</TableCell>
            <TableCell>0</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Dreamer Spinning Suspended Disbelief</TableCell>
            <TableCell>0</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>⡫ I GUESS WE CAN'T ALL SIT NEXT TO EACH OTHER</TableCell>
            <TableCell>0</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>SeptaCube</TableCell>
            <TableCell>0</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>simplicissimus</TableCell>
            <TableCell>1</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tricksters</TableCell>
            <TableCell>1</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Mobius Strippers</TableCell>
            <TableCell>1</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/* most hints */}
      <Table className="mx-auto w-fit">
        <TableHeader>
          <TableRow className="hover:bg-inherit">
            <TableHead className="text-main-header">display_name</TableHead>
            <TableHead className="text-main-header">hint_count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="pointer-events-none">
          <TableRow>
            <TableCell>Alteleid</TableCell>
            <TableCell>24</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>何以为我</TableCell>
            <TableCell>21</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>More About Vikings</TableCell>
            <TableCell>21</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Turtle Power</TableCell>
            <TableCell>20</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Hunters Around The World</TableCell>
            <TableCell>20</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Livin’ Covida Loca</TableCell>
            <TableCell>19</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Hong Kong Guy My</TableCell>
            <TableCell>19</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Intervarsi-Teammate: Slowdown Showtime!</TableCell>
            <TableCell>18</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Team Conundrum</TableCell>
            <TableCell>18</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Team Peggle</TableCell>
            <TableCell>18</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/* most hints + follow-ups */}
      <Table className="mx-auto w-fit">
        <TableHeader>
          <TableRow className="hover:bg-inherit">
            <TableHead className="text-main-header">display_name</TableHead>
            <TableHead className="text-main-header">total_hint_count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="pointer-events-none">
          <TableRow>
            <TableCell>Hunters Around The World</TableCell>
            <TableCell>58</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Alteleid</TableCell>
            <TableCell>53</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Livin’ Covida Loca</TableCell>
            <TableCell>43</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>the riddlers</TableCell>
            <TableCell>42</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Puzzle Solution Doxxers</TableCell>
            <TableCell>36</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>helppuzzles</TableCell>
            <TableCell>35</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>何以为我</TableCell>
            <TableCell>34</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Hong Kong Guy My</TableCell>
            <TableCell>32</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Maxwell Rose</TableCell>
            <TableCell>32</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>stɹeɪjə maɪt</TableCell>
            <TableCell>30</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/* PUZZLE STATS */}
      {/* primary stats */}
      <Table className="mx-auto w-fit">
        <TableHeader>
          <TableRow className="hover:bg-inherit">
            <TableHead className="text-main-header">puzzle_id</TableHead>
            <TableHead className="text-main-header">guesses</TableHead>
            <TableHead className="text-main-header">solves</TableHead>
            <TableHead className="text-main-header">backsolves</TableHead>
            <TableHead className="text-main-header">hints</TableHead>
            <TableHead className="text-main-header">
              hints + follow-ups
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="pointer-events-none">
          <TableRow>
            <TableCell>a-fistful-of-cards</TableCell>
            <TableCell>350</TableCell>
            <TableCell>212</TableCell>
            <TableCell>85</TableCell>
            <TableCell>5</TableCell>
            <TableCell>5</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>a-fistful-of-cards-ii</TableCell>
            <TableCell>190</TableCell>
            <TableCell>158</TableCell>
            <TableCell>17</TableCell>
            <TableCell>2</TableCell>
            <TableCell>2</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>a-fistful-of-cards-iii</TableCell>
            <TableCell>184</TableCell>
            <TableCell>131</TableCell>
            <TableCell>15</TableCell>
            <TableCell>2</TableCell>
            <TableCell>2</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>a-fistful-of-cards-iv</TableCell>
            <TableCell>420</TableCell>
            <TableCell>95</TableCell>
            <TableCell>12</TableCell>
            <TableCell>23</TableCell>
            <TableCell>33</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>aha-erlebnis</TableCell>
            <TableCell>637</TableCell>
            <TableCell>138</TableCell>
            <TableCell>0</TableCell>
            <TableCell>35</TableCell>
            <TableCell>54</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>are-you-sure</TableCell>
            <TableCell>229</TableCell>
            <TableCell>145</TableCell>
            <TableCell>4</TableCell>
            <TableCell>1</TableCell>
            <TableCell>1</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>balloon-animals</TableCell>
            <TableCell>412</TableCell>
            <TableCell>179</TableCell>
            <TableCell>0</TableCell>
            <TableCell>10</TableCell>
            <TableCell>15</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>barbie</TableCell>
            <TableCell>230</TableCell>
            <TableCell>118</TableCell>
            <TableCell>19</TableCell>
            <TableCell>38</TableCell>
            <TableCell>58</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>beads</TableCell>
            <TableCell>579</TableCell>
            <TableCell>151</TableCell>
            <TableCell>27</TableCell>
            <TableCell>72</TableCell>
            <TableCell>112</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>bluenos-puzzle-box</TableCell>
            <TableCell>321</TableCell>
            <TableCell>124</TableCell>
            <TableCell>8</TableCell>
            <TableCell>14</TableCell>
            <TableCell>23</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>boring-plot</TableCell>
            <TableCell>191</TableCell>
            <TableCell>94</TableCell>
            <TableCell>0</TableCell>
            <TableCell>45</TableCell>
            <TableCell>72</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>chain-letters</TableCell>
            <TableCell>216</TableCell>
            <TableCell>136</TableCell>
            <TableCell>15</TableCell>
            <TableCell>23</TableCell>
            <TableCell>37</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>color-wheel</TableCell>
            <TableCell>338</TableCell>
            <TableCell>83</TableCell>
            <TableCell>11</TableCell>
            <TableCell>37</TableCell>
            <TableCell>56</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>connect-the-dots</TableCell>
            <TableCell>788</TableCell>
            <TableCell>194</TableCell>
            <TableCell>15</TableCell>
            <TableCell>37</TableCell>
            <TableCell>51</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>constellation</TableCell>
            <TableCell>472</TableCell>
            <TableCell>93</TableCell>
            <TableCell>3</TableCell>
            <TableCell>29</TableCell>
            <TableCell>39</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>cutting-room-floor</TableCell>
            <TableCell>400</TableCell>
            <TableCell>86</TableCell>
            <TableCell>0</TableCell>
            <TableCell>43</TableCell>
            <TableCell>62</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>drop-the</TableCell>
            <TableCell>297</TableCell>
            <TableCell>206</TableCell>
            <TableCell>0</TableCell>
            <TableCell>5</TableCell>
            <TableCell>8</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>eye-of-the-storm</TableCell>
            <TableCell>184</TableCell>
            <TableCell>127</TableCell>
            <TableCell>1</TableCell>
            <TableCell>30</TableCell>
            <TableCell>49</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>eye-spy</TableCell>
            <TableCell>4431</TableCell>
            <TableCell>108</TableCell>
            <TableCell>15</TableCell>
            <TableCell>16</TableCell>
            <TableCell>21</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>eye-to-eye</TableCell>
            <TableCell>124</TableCell>
            <TableCell>97</TableCell>
            <TableCell>0</TableCell>
            <TableCell>3</TableCell>
            <TableCell>6</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>filming-schedule</TableCell>
            <TableCell>337</TableCell>
            <TableCell>241</TableCell>
            <TableCell>7</TableCell>
            <TableCell>5</TableCell>
            <TableCell>5</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>financial-crimes-3</TableCell>
            <TableCell>272</TableCell>
            <TableCell>112</TableCell>
            <TableCell>13</TableCell>
            <TableCell>12</TableCell>
            <TableCell>17</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>find-ben</TableCell>
            <TableCell>603</TableCell>
            <TableCell>232</TableCell>
            <TableCell>22</TableCell>
            <TableCell>7</TableCell>
            <TableCell>8</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>fractal-shanty</TableCell>
            <TableCell>396</TableCell>
            <TableCell>163</TableCell>
            <TableCell>70</TableCell>
            <TableCell>31</TableCell>
            <TableCell>53</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>fridge-magnets</TableCell>
            <TableCell>207</TableCell>
            <TableCell>93</TableCell>
            <TableCell>1</TableCell>
            <TableCell>3</TableCell>
            <TableCell>4</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>genetic-counseling</TableCell>
            <TableCell>193</TableCell>
            <TableCell>111</TableCell>
            <TableCell>15</TableCell>
            <TableCell>2</TableCell>
            <TableCell>3</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>hand-letters</TableCell>
            <TableCell>167</TableCell>
            <TableCell>143</TableCell>
            <TableCell>1</TableCell>
            <TableCell>4</TableCell>
            <TableCell>6</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>heist</TableCell>
            <TableCell>405</TableCell>
            <TableCell>235</TableCell>
            <TableCell>60</TableCell>
            <TableCell>14</TableCell>
            <TableCell>16</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>heist-ii</TableCell>
            <TableCell>184</TableCell>
            <TableCell>164</TableCell>
            <TableCell>6</TableCell>
            <TableCell>4</TableCell>
            <TableCell>5</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>heist-iii</TableCell>
            <TableCell>186</TableCell>
            <TableCell>143</TableCell>
            <TableCell>10</TableCell>
            <TableCell>5</TableCell>
            <TableCell>8</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>identify-the-piece</TableCell>
            <TableCell>4249</TableCell>
            <TableCell>131</TableCell>
            <TableCell>6</TableCell>
            <TableCell>30</TableCell>
            <TableCell>51</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>imagine</TableCell>
            <TableCell>332</TableCell>
            <TableCell>108</TableCell>
            <TableCell>12</TableCell>
            <TableCell>34</TableCell>
            <TableCell>45</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>international-neighbours</TableCell>
            <TableCell>769</TableCell>
            <TableCell>117</TableCell>
            <TableCell>61</TableCell>
            <TableCell>64</TableCell>
            <TableCell>104</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>like-clockwork</TableCell>
            <TableCell>495</TableCell>
            <TableCell>93</TableCell>
            <TableCell>3</TableCell>
            <TableCell>53</TableCell>
            <TableCell>71</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>lost-lyric</TableCell>
            <TableCell>355</TableCell>
            <TableCell>157</TableCell>
            <TableCell>28</TableCell>
            <TableCell>39</TableCell>
            <TableCell>49</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>m-guards-n-doors-and-k-choices</TableCell>
            <TableCell>707</TableCell>
            <TableCell>156</TableCell>
            <TableCell>0</TableCell>
            <TableCell>9</TableCell>
            <TableCell>13</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>narcissism</TableCell>
            <TableCell>360</TableCell>
            <TableCell>147</TableCell>
            <TableCell>0</TableCell>
            <TableCell>1</TableCell>
            <TableCell>1</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>one-guard-screen</TableCell>
            <TableCell>540</TableCell>
            <TableCell>177</TableCell>
            <TableCell>4</TableCell>
            <TableCell>126</TableCell>
            <TableCell>159</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>opening-sequences</TableCell>
            <TableCell>700</TableCell>
            <TableCell>143</TableCell>
            <TableCell>11</TableCell>
            <TableCell>15</TableCell>
            <TableCell>24</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>peanuts</TableCell>
            <TableCell>302</TableCell>
            <TableCell>224</TableCell>
            <TableCell>5</TableCell>
            <TableCell>5</TableCell>
            <TableCell>7</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>piecemeal</TableCell>
            <TableCell>274</TableCell>
            <TableCell>149</TableCell>
            <TableCell>2</TableCell>
            <TableCell>28</TableCell>
            <TableCell>36</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>plagiarism</TableCell>
            <TableCell>726</TableCell>
            <TableCell>221</TableCell>
            <TableCell>1</TableCell>
            <TableCell>14</TableCell>
            <TableCell>15</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>red-blue</TableCell>
            <TableCell>382</TableCell>
            <TableCell>88</TableCell>
            <TableCell>9</TableCell>
            <TableCell>33</TableCell>
            <TableCell>55</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>secret-ingredient</TableCell>
            <TableCell>190</TableCell>
            <TableCell>121</TableCell>
            <TableCell>0</TableCell>
            <TableCell>2</TableCell>
            <TableCell>3</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>six-degrees</TableCell>
            <TableCell>5307</TableCell>
            <TableCell>128</TableCell>
            <TableCell>0</TableCell>
            <TableCell>26</TableCell>
            <TableCell>32</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>sound-of-music</TableCell>
            <TableCell>152</TableCell>
            <TableCell>98</TableCell>
            <TableCell>1</TableCell>
            <TableCell>4</TableCell>
            <TableCell>5</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ten-guards-ten-doors</TableCell>
            <TableCell>953</TableCell>
            <TableCell>208</TableCell>
            <TableCell>0</TableCell>
            <TableCell>37</TableCell>
            <TableCell>52</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>the-compact-disc</TableCell>
            <TableCell>534</TableCell>
            <TableCell>87</TableCell>
            <TableCell>24</TableCell>
            <TableCell>40</TableCell>
            <TableCell>66</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>the-final-heist</TableCell>
            <TableCell>214</TableCell>
            <TableCell>93</TableCell>
            <TableCell>6</TableCell>
            <TableCell>7</TableCell>
            <TableCell>7</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>the-guard-and-the-door</TableCell>
            <TableCell>778</TableCell>
            <TableCell>138</TableCell>
            <TableCell>0</TableCell>
            <TableCell>51</TableCell>
            <TableCell>79</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>the-snack-zone</TableCell>
            <TableCell>156</TableCell>
            <TableCell>136</TableCell>
            <TableCell>0</TableCell>
            <TableCell>2</TableCell>
            <TableCell>2</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>two-guards-river</TableCell>
            <TableCell>246</TableCell>
            <TableCell>246</TableCell>
            <TableCell>0</TableCell>
            <TableCell>1</TableCell>
            <TableCell>3</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>two-guards-two-doors</TableCell>
            <TableCell>782</TableCell>
            <TableCell>286</TableCell>
            <TableCell>5</TableCell>
            <TableCell>2</TableCell>
            <TableCell>2</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>walk-of-fame</TableCell>
            <TableCell>889</TableCell>
            <TableCell>184</TableCell>
            <TableCell>67</TableCell>
            <TableCell>50</TableCell>
            <TableCell>62</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>watching-between-the-lines</TableCell>
            <TableCell>458</TableCell>
            <TableCell>158</TableCell>
            <TableCell>43</TableCell>
            <TableCell>35</TableCell>
            <TableCell>41</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>whats-my-ride</TableCell>
            <TableCell>362</TableCell>
            <TableCell>131</TableCell>
            <TableCell>2</TableCell>
            <TableCell>8</TableCell>
            <TableCell>9</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>youve-got-this-covered</TableCell>
            <TableCell>289</TableCell>
            <TableCell>160</TableCell>
            <TableCell>22</TableCell>
            <TableCell>3</TableCell>
            <TableCell>4</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/* secondary stats */}
      <Table className="mx-auto w-fit">
        <TableHeader>
          <TableRow className="hover:bg-inherit">
            <TableHead className="text-main-header">puzzle_id</TableHead>
            <TableHead className="text-main-header">top_incorrect</TableHead>
            <TableHead className="text-main-header">
              relative_frequency
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="pointer-events-none">
          <TableRow>
            <TableCell>identify-the-piece</TableCell>
            <TableCell>LITTLEFUGUE</TableCell>
            <TableCell>116.0</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>imagine</TableCell>
            <TableCell>APOLOGIZE</TableCell>
            <TableCell>108.3</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>eye-spy</TableCell>
            <TableCell>PROVIDENCE</TableCell>
            <TableCell>96.3</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>six-degrees</TableCell>
            <TableCell>DANIELRADCLIFFE</TableCell>
            <TableCell>90.6</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>narcissism</TableCell>
            <TableCell>SUPERIOR</TableCell>
            <TableCell>90.5</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>connect-the-dots</TableCell>
            <TableCell>SHAPES</TableCell>
            <TableCell>89.7</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>aha-erlebnis</TableCell>
            <TableCell>GEFUHLPROOF</TableCell>
            <TableCell>86.2</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>plagiarism</TableCell>
            <TableCell>CHILLEST</TableCell>
            <TableCell>73.8</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>m-guards-n-doors-and-k-choices</TableCell>
            <TableCell>PULLEYS</TableCell>
            <TableCell>52.6</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>international-neighbours</TableCell>
            <TableCell>FAVORITE</TableCell>
            <TableCell>51.3</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>the-final-heist</TableCell>
            <TableCell>BLIND</TableCell>
            <TableCell>43.0</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>two-guards-two-doors</TableCell>
            <TableCell>STEERS</TableCell>
            <TableCell>38.8</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ten-guards-ten-doors</TableCell>
            <TableCell>SIX</TableCell>
            <TableCell>35.6</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>whats-my-ride</TableCell>
            <TableCell>APOLLO</TableCell>
            <TableCell>33.6</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>opening-sequences</TableCell>
            <TableCell>PAWNTOFF</TableCell>
            <TableCell>28.7</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>like-clockwork</TableCell>
            <TableCell>ORANGE</TableCell>
            <TableCell>26.9</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>cutting-room-floor</TableCell>
            <TableCell>BILLY</TableCell>
            <TableCell>26.7</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>lost-lyric</TableCell>
            <TableCell>SUNDAY</TableCell>
            <TableCell>25.5</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>find-ben</TableCell>
            <TableCell>MUSEUM</TableCell>
            <TableCell>25.4</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>red-blue</TableCell>
            <TableCell>DATE</TableCell>
            <TableCell>25.0</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>the-compact-disc</TableCell>
            <TableCell>KUWAIT</TableCell>
            <TableCell>21.8</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>beads</TableCell>
            <TableCell>PRESS</TableCell>
            <TableCell>19.2</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>walk-of-fame</TableCell>
            <TableCell>CRUZ</TableCell>
            <TableCell>16.3</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>the-guard-and-the-door</TableCell>
            <TableCell>ACTOR</TableCell>
            <TableCell>15.9</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>one-guard-screen</TableCell>
            <TableCell>DOUBLESLIT</TableCell>
            <TableCell>15.8</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>youve-got-this-covered</TableCell>
            <TableCell>DAY</TableCell>
            <TableCell>15.0</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>boring-plot</TableCell>
            <TableCell>EXTRACTION</TableCell>
            <TableCell>13.8</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>color-wheel</TableCell>
            <TableCell>FENNEL</TableCell>
            <TableCell>13.3</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>watching-between-the-lines</TableCell>
            <TableCell>BATESEED</TableCell>
            <TableCell>12.7</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>barbie</TableCell>
            <TableCell>CHATTYKATHY</TableCell>
            <TableCell>11.9</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>fridge-magnets</TableCell>
            <TableCell>DIREAP</TableCell>
            <TableCell>10.8</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>sound-of-music</TableCell>
            <TableCell>CYANOCOCCUSNINE</TableCell>
            <TableCell>10.2</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>constellation</TableCell>
            <TableCell>DURIAN</TableCell>
            <TableCell>9.7</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>chain-letters</TableCell>
            <TableCell>THEGATHERINGSTORM</TableCell>
            <TableCell>8.8</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>piecemeal</TableCell>
            <TableCell>TEXTALIEN</TableCell>
            <TableCell>8.7</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>heist</TableCell>
            <TableCell>FLOORPLANBROWN</TableCell>
            <TableCell>8.5</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>a-fistful-of-cards-iv</TableCell>
            <TableCell>ORANGE</TableCell>
            <TableCell>8.4</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>balloon-animals</TableCell>
            <TableCell>REALPOPMUSIC</TableCell>
            <TableCell>8.4</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>filming-schedule</TableCell>
            <TableCell>BANNED</TableCell>
            <TableCell>5.8</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>a-fistful-of-cards</TableCell>
            <TableCell>GRI</TableCell>
            <TableCell>5.7</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>eye-to-eye</TableCell>
            <TableCell>MIRRORS</TableCell>
            <TableCell>5.2</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>secret-ingredient</TableCell>
            <TableCell>OASISSAND</TableCell>
            <TableCell>5.0</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>drop-the</TableCell>
            <TableCell>OLDERIDEAS</TableCell>
            <TableCell>4.9</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>fractal-shanty</TableCell>
            <TableCell>MERFOLK</TableCell>
            <TableCell>4.3</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>bluenos-puzzle-box</TableCell>
            <TableCell>WHEELING</TableCell>
            <TableCell>4.0</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>genetic-counseling</TableCell>
            <TableCell>JOLENE</TableCell>
            <TableCell>3.6</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>financial-crimes-3</TableCell>
            <TableCell>ACTORSEQUITYPRIVATEFIRM</TableCell>
            <TableCell>3.6</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>a-fistful-of-cards-ii</TableCell>
            <TableCell>SPRING</TableCell>
            <TableCell>3.2</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>eye-of-the-storm</TableCell>
            <TableCell>TROPICS</TableCell>
            <TableCell>3.1</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>peanuts</TableCell>
            <TableCell>PROTOHUMAN</TableCell>
            <TableCell>2.7</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>heist-ii</TableCell>
            <TableCell>SPRING</TableCell>
            <TableCell>2.4</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>a-fistful-of-cards-iii</TableCell>
            <TableCell>FIGHTLE</TableCell>
            <TableCell>2.3</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>hand-letters</TableCell>
            <TableCell>LUNULE</TableCell>
            <TableCell>2.1</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>are-you-sure</TableCell>
            <TableCell>COMBINATION</TableCell>
            <TableCell>2.1</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>the-snack-zone</TableCell>
            <TableCell>SAUVINGNON</TableCell>
            <TableCell>1.5</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>heist-iii</TableCell>
            <TableCell>IMPOSSIBLE</TableCell>
            <TableCell>1.4</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/* MISCELLANEOUS STATS */}
      {/* first solves */}
      <Table className="mx-auto w-fit">
        <TableHeader>
          <TableRow className="hover:bg-inherit">
            <TableHead className="text-main-header">interaction_type</TableHead>
            <TableHead className="text-main-header">puzzle_id</TableHead>
            <TableHead className="text-main-header">display_name</TableHead>
            <TableHead className="text-main-header">solve_duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="pointer-events-none">
          <TableRow>
            <TableCell>in-person</TableCell>
            <TableCell>walk-of-fame</TableCell>
            <TableCell>meowmeow</TableCell>
            <TableCell>0m 14.178s</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>remote-box</TableCell>
            <TableCell>two-guards-two-doors</TableCell>
            <TableCell>✈✈✈ galactic procrastinators ✈✈✈</TableCell>
            <TableCell>5m 0.897s</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>remote</TableCell>
            <TableCell>two-guards-two-doors</TableCell>
            <TableCell>Theatre Screen's Bright Illumination</TableCell>
            <TableCell>7m 20.635s</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/* longest guesses */}
      <Table className="mx-auto w-fit">
        <TableHeader>
          <TableRow className="hover:bg-inherit">
            <TableHead className="text-main-header">guess</TableHead>
            <TableHead className="text-main-header">length</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="pointer-events-none">
          <TableRow>
            <TableCell>
              THISISJUSTANAAOCTAVEASTHEBASSPARTANDITSBEENSHORTENEDABUNCHANDTHEREABIGGAPHEREIDKWHATELSEYOUWANT
            </TableCell>
            <TableCell>95</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              OOOOOOOOOOOAAAAEAAIAUJOOOOOOOOOOOOOAAEOAAUUAEEEEEEEEEAAAAEAEIEAJOOOOOOOOOOEEEEOAAAAAAAA
            </TableCell>
            <TableCell>87</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              ASIFWALTZBYGEORDIEGREEPLISTENTOTHENEWSOUNDTODAYTHEBESTALBUMOFTWENTYTWENTYFOUR
            </TableCell>
            <TableCell>77</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              FUNFACTTHERAFSTARTEDTHECARROTSMYTHWHENWHATTHEIRPILOTSACTUALLYHADWASRADAR
            </TableCell>
            <TableCell>72</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              HTTPSWWWBROWNPUZZLEHUNTCOMNEXTIMAGEURLFNEXTFSTATICFMEDIAFSNACKBEJPGWQ
            </TableCell>
            <TableCell>69</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              AARGHWHICHISTHERIGHTSHAKESPEARESOURCETHATMATCHESYOURLINENUMBERS
            </TableCell>
            <TableCell>63</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              SINKCALPUREVLIGOLINDIGOLINDIHWOLPRELACKNIDNIGOLINKCALISETILE
            </TableCell>
            <TableCell>60</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              ATLEASTWITHTHEPREVIOUSONEYOUCANGETITFROMNUTRIMATICWITHETUDES
            </TableCell>
            <TableCell>60</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              WHEREDIDICOMEFROMWHEREDIDIGOWHEREDIDICOMEFROMCOTTONEYEDJOE
            </TableCell>
            <TableCell>58</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              WAITISITJUSTNORMALMONTYHALLANDWEDONTCAREABOUTTHEBULLCRAP
            </TableCell>
            <TableCell>56</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              IDKWHATTHISPUZZLEISABOUTBUTILOVETHELONGESTJOHNSYAY
            </TableCell>
            <TableCell>50</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              THERESNOPUZZLEHEREJUSTFUCKINGFLAVORTEXTWHATTHEFUCK
            </TableCell>
            <TableCell>50</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              LETSWATCHEXPERTSTRYTOPUZZLEATSOMERIDDLESINADESERT
            </TableCell>
            <TableCell>49</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              LETSWATCHEXPERTSTRYTOPUZZLEATSOMERIDDLESINADESERT
            </TableCell>
            <TableCell>49</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              LETSWATCHEXPERTSTRYTOPUZZLEATSOMERIDDLESINADESERT
            </TableCell>
            <TableCell>49</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              LETSWATCHEXPERTSTRYTOPUZZLEATSOMERIDDLESINADESERT
            </TableCell>
            <TableCell>49</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              IFYOUWANTMETOSTOPSENDMEADMITSPROCYONINPUZZLEWORLD
            </TableCell>
            <TableCell>49</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              LETSWATCHEXPERTSTRYTOPUZZLEATSOMERIDDLESINADESERT
            </TableCell>
            <TableCell>49</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              LETSWATCHEXPERTSTRYTOPUZZLEATSOMERIDDLESINADESERT
            </TableCell>
            <TableCell>49</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              LETSWATCHEXPERTSTRYTOPUZZLEATSOMERIDDLESINADESERT
            </TableCell>
            <TableCell>49</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              LETSWATCHEXPERTSTRYTOPUZZLEATSOMERIDDLESINADESERT
            </TableCell>
            <TableCell>49</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              LETSWATCHEXPERTSTRYTOPUZZLEATSOMERIDDLESINADESERT
            </TableCell>
            <TableCell>49</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              LETSWATCHEXPERTSTRYTOPUZZLEATSOMERIDDLESINADESERT
            </TableCell>
            <TableCell>49</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              LETSWATCHEXPERTSTRYTOPUZZLEATSOMERIDDLESINADESERT
            </TableCell>
            <TableCell>49</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              LETSWATCHEXPERTSTRYTOPUZZLEATSOMERIDDLESINADESERT
            </TableCell>
            <TableCell>49</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/* one-letter guesses */}
      <Table className="mx-auto w-fit">
        <TableHeader>
          <TableRow className="hover:bg-inherit">
            <TableHead className="text-main-header">I</TableHead>
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
            <TableCell>13</TableCell>
            <TableCell>9</TableCell>
            <TableCell>8</TableCell>
            <TableCell>8</TableCell>
            <TableCell>7</TableCell>
            <TableCell>4</TableCell>
            <TableCell>4</TableCell>
            <TableCell>4</TableCell>
            <TableCell>4</TableCell>
            <TableCell>3</TableCell>
            <TableCell>3</TableCell>
            <TableCell>3</TableCell>
            <TableCell>2</TableCell>
            <TableCell>2</TableCell>
            <TableCell>2</TableCell>
            <TableCell>2</TableCell>
            <TableCell>2</TableCell>
            <TableCell>2</TableCell>
            <TableCell>2</TableCell>
            <TableCell>1</TableCell>
            <TableCell>1</TableCell>
            <TableCell>1</TableCell>
            <TableCell>1</TableCell>
            <TableCell>1</TableCell>
            <TableCell>1</TableCell>
            <TableCell>1</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/* shortest hints */}
      <Table className="mx-auto w-fit">
        <TableHeader>
          <TableRow className="hover:bg-inherit">
            <TableHead className="text-main-header">request</TableHead>
            <TableHead className="text-main-header">length</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="pointer-events-none">
          <TableRow>
            <TableCell></TableCell>
            <TableCell>0</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>jk\n</TableCell>
            <TableCell>3</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>GIARRE</TableCell>
            <TableCell>6</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>no clue</TableCell>
            <TableCell>7</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>CHILLEST</TableCell>
            <TableCell>8</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Hint on start</TableCell>
            <TableCell>13</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ignore this\n\n</TableCell>
            <TableCell>13</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>What does BLUENO mean?</TableCell>
            <TableCell>23</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>is it related to course timings?\n</TableCell>
            <TableCell>33</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>We're not sure where to start here</TableCell>
            <TableCell>34</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
