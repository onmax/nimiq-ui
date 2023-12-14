import { Logo, Logos } from "./types"
import { ref } from "vue"

const logos = ref<Logos>({
  [Logo.Nimiq]: true,
  [Logo.Kryptostadt]: false,
  [Logo.Criptociudad]: false,
})

const profiles = [
      {
        "name": "Chuck Norris",
        "role": "Martial Arts Instructor",
        "email": "chuck.norris@roundhouse.com",
        "phoneNumber": "+1 555 101 2020",
        "telegram": "https://t.me/ChuckNorris",
        "facebook": "https://facebook.com/RealChuckNorris",
        "youtube": "https://youtube.com/ChuckNorris",
        "instagram": "https://instagram.com/ChuckNorris",
        "twitter": "https://twitter.com/RealChuckNorris",
        "disclosure": `Chuck Norris doesn't send emails; they flee his computer in fear. Any resemblance to real emails is purely coincidental and not intended by Chuck Norris.\nNo animals were harmed in the making of this email.`
      },
      {
        "name": "Darth Vader",
        "role": "Galactic Overlord",
        "email": "darth.vader@deathstar.emp",
        "phoneNumber": "+1 555 202 3030",
        "telegram": "https://t.me/DarthVader",
        "facebook": "https://facebook.com/LordVader",
        "youtube": "https://youtube.com/DarthVader",
        "instagram": "https://instagram.com/DarthVader",
        "twitter": "https://twitter.com/LordVader",
        "disclosure": `This email is part of the Empire's outreach program. If you do not respond, you may be mistaken for a rebel supporter. Remember, the Dark Side has cookies.\nBe the force with you. I mean, may the force be with you.`
      },
      {
        "name": "Sherlock Holmes",
        "role": "Consulting Detective",
        "email": "sherlock.holmes@bakerst.co.uk",
        "phoneNumber": "+44 20 7946 0958",
        "telegram": "https://t.me/SherlockHolmes",
        "facebook": "https://facebook.com/RealSherlockHolmes",
        "youtube": "https://youtube.com/SherlockHolmes",
        "instagram": "https://instagram.com/SherlockHolmes",
        "twitter": "https://twitter.com/TheRealSherlock",
        "disclosure": `If you are receiving this email, you are either a client or a suspect. If you are a suspect, please contact the police immediately. If you are a client, please respond promptly.\nThis email is confidential and intended for the recipient only. If you are not the intended recipient, please delete this email and notify the sender immediately.`
      },
      {
        "name": "Mario",
        "role": "Professional Plumber",
        "email": "super.mario@nintendo.com",
        "phoneNumber": "+1 555 404 5050",
        "telegram": "https://t.me/SuperMario",
        "facebook": "https://facebook.com/SuperMario",
        "youtube": "https://youtube.com/SuperMario",
        "instagram": "https://instagram.com/MarioBros",
        "twitter": "https://twitter.com/SuperMario",
        "disclosure": `Mario is busy saving princesses and may not reply promptly. If your query is about rescuing princesses, jumping on turtles, or plumbing, you're in the right castle.\nEveryone is entitled to be stupid, but some abuse the privilege.`
      },
      {
        "name": "Indiana Jones",
        "role": "Archaeologist",
        "email": "indiana.jones@adventures.com",
        "phoneNumber": "+1 555 606 7070",
        "telegram": "https://t.me/DrJones",
        "facebook": "https://facebook.com/DrIndianaJones",
        "youtube": "https://youtube.com/IndianaJones",
        "instagram": "https://instagram.com/IndianaJones",
        "twitter": "https://twitter.com/DrJones",
        "disclosure": `Dr. Jones might be in an ancient temple or lost city and unable to respond. If this is about an ancient artifact, please ensure it belongs in a museum.\nI might able to respond if I am not busy saving the world.`
      },
      {
        "name": "James Bond",
        "role": "Secret Agent",
        "email": "james.bond@mi6.gov.uk",
        "phoneNumber": "+44 20 7930 9000",
        "telegram": "https://t.me/JamesBond",
        "facebook": "https://facebook.com/Agent007",
        "youtube": "https://youtube.com/JamesBond",
        "instagram": "https://instagram.com/JamesBond",
        "twitter": "https://twitter.com/Agent007",
        "disclosure": `Due to the secretive nature of his work, Mr. Bond's response times may vary. In the case of an urgent matter, contact Q Branch.\nYou are writing to the Mail, E-mail.`
      },
      {
        name: "Satoshi Nakamoto",
        role: "Bitcoin Creator",
        email: "btc@btc.com",
        phoneNumber: "+1 555 808 9090",
        telegram: "https://t.me/SatoshiNakamoto",
        facebook: "https://facebook.com/SatoshiNakamoto",
        youtube: "https://youtube.com/SatoshiNakamoto",
        instagram: "https://instagram.com/SatoshiNakamoto",
        twitter: "https://twitter.com/SatoshiNakamoto",
        disclosure: `This email is part of the Bitcoin outreach program. If you do not respond, you may be mistaken for a nocoiner. Remember, Bitcoin fixes this.\nBe the Bitcoin with you. I mean, may the Bitcoin be with you.`,
      },
      {
        name: 'Elon Musk',
        role: 'CEO',
        email: "x14ae@com",
        phoneNumber: "+1 555 808 9090",
        telegram: "https://t.me/elonmusk",
        facebook: "https://facebook.com/elonmusk",
        youtube: "https://youtube.com/elonmusk",
        instagram: "https://instagram.com/elonmusk",
        twitter: "https://twitter.com/elonmusk",
        disclosure: `I no longer use email. Reach me on x, because I spent a fortune on it, so I need to get my money's worth.\nI'm not a weirdo. I'm just a normal dude who happens to be the CEO of a company and has a couple of hobbies.`,
      }
  ].map(profile => ({ ...profile, disclosure: `Disclousure:\n${profile.disclosure}`, logos }))



export const profile = { ...profiles[Math.floor(Math.random() * profiles.length)], logos }
