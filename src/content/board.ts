// Board & Leadership page content.

import markChamberlain from "@/assets/board/mark-chamberlain.jpg";
import paulHyer from "@/assets/board/paul-hyer.jpg";
import lornaCarter from "@/assets/board/lorna-carter.jpg";
import cindyBeecher from "@/assets/board/cindy-beecher.jpg";
import garrettBonella from "@/assets/board/garrett-schulda.jpg";
import dawnHarold from "@/assets/board/dawn-harold.jpg";
import daveLundstrom from "@/assets/board/dave-langston.jpg";
import spenceMcArthur from "@/assets/board/spencer-carthur.jpg";
import seanObrien from "@/assets/board/sean-obrien.jpg";
import paulaPrice from "@/assets/board/paula-price.jpg";
import codyRichards from "@/assets/board/cody-richards.jpg";
import morganSmith from "@/assets/board/morey-smith.jpg";
import dianaWindley from "@/assets/board/diana-wincup.jpg";
import zachWynegar from "@/assets/board/zack-wynegar.jpg";
import tiffanyShields from "@/assets/board/tiffany-schuler.jpg";
import audieBaker from "@/assets/board/audie-baker.jpg";
import kevinEastman from "@/assets/board/kevin-eastman.jpg";
import jedBurton from "@/assets/board/jed-burton.jpg";
import michelleJensen from "@/assets/board/michele-euson.jpg";
import noelDzuka from "@/assets/board/andrew-dzaga.jpg";
import madelineMcDonald from "@/assets/board/madeline-mcdonald.jpg";

export const board = {
  hero: {
    eyebrow: "Board & Leadership",
    title: "Local leaders, volunteering their time for our neighbors.",
    body: "Our board of directors is made up of people who live, work, and serve in Morgan and Weber Counties. Every board member volunteers their time and expertise — no board member is compensated.",
  },

  directorsHeading: {
    eyebrow: "Board Members",
    title: "Meet the board",
  },

  directors: [
    { name: "Mark Chamberlain", role: "Board President", affiliation: "Ascent Credit Union", photo: markChamberlain },
    { name: "Paul Miner", role: "Board Vice President", affiliation: "Mountain America Credit Union", photo: paulHyer },
    { name: "Lorna Carter", role: "Board Treasurer", affiliation: "Wasatch Peaks Credit Union", photo: lornaCarter },
    { name: "Cindy Beecher", role: "Branch Manager", affiliation: "First Community Bank", photo: cindyBeecher },
    { name: "Barrett Bonella", role: "Associate Professor of Social Work", affiliation: "Weber State University", photo: garrettBonella },
    { name: "Dawn Harold, M.D.", role: "Chief Medical Officer", affiliation: "Ogden Regional Medical Center", photo: dawnHarold },
    { name: "Dave Lundstrom", role: "Community Representative", affiliation: "", photo: daveLundstrom },
    { name: "Spence McArthur", role: "Executive Vice President", affiliation: "Wasatch Peaks Credit Union", photo: spenceMcArthur },
    { name: "Sean O'Brien", role: "Business Development Liaison", affiliation: "Northern Utah Rehabilitation Hospital", photo: seanObrien },
    { name: "Paula Price", role: "Community Representative", affiliation: "", photo: paulaPrice },
    { name: "Drew Richards", role: "Executive Director", affiliation: "The Auberge at North Ogden", photo: codyRichards },
    { name: "Morris Smith", role: "Vice President, Commercial Loan Officer", affiliation: "DL Evans Bank", photo: morganSmith },
    { name: "Diana Windley", role: "Senior Vice President", affiliation: "Goldenwest Credit Union", photo: dianaWindley },
    { name: "Zach Winegar", role: "Senior Vice President of Marketing & Member Engagement", affiliation: "America First Credit Union", photo: zachWynegar },
    { name: "Tiffany Shisler", role: "General Manager", affiliation: "Treeo Senior Living", photo: tiffanyShields },
    { name: "Alexis Baker", role: "Employee Representative", affiliation: "Weber Human Services", photo: audieBaker },
    { name: "Kevin Eastman", role: "Director, CEO", affiliation: "Weber Human Services", photo: kevinEastman },
    { name: "Jed Burton", role: "Director, Clinical Services", affiliation: "Weber Human Services", photo: jedBurton },
    { name: "Michelle Jenson", role: "Director, CFO", affiliation: "Weber Human Services", photo: michelleJensen },
    { name: "Nobu Iizuka", role: "Director, Community and Senior Services", affiliation: "Weber Human Services", photo: noelDzuka },
    { name: "Madeline McDonald", role: "Director, Foundation", affiliation: "Weber Human Services", photo: madelineMcDonald },
  ],

  joinCta: {
    eyebrow: "Join the board",
    title: "Interested in serving your community?",
    body: "We periodically welcome new directors who bring fresh perspective and a commitment to human services in our region. Reach out to learn about open seats and the nomination process.",
    buttonLabel: "Contact the board",
  },
};
