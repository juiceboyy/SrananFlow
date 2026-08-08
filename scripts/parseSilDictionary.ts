import fs from 'fs';
import path from 'path';
import { RAGCorpusItem } from '../src/types';

// Raw dictionary entries extracted from SIL International Woortubuku fu Sranan Tongo (John Wilner, 5th ed. 2007)
export const RAW_SIL_DICTIONARY_TEXT = `
a1 prn. 3rd person singular subject pronoun (he, she, it). E.g., Di Hendrik doro tide, a no taki no wan sma odi. (When Hendrik arrived today, he didn't greet anyone).
a2 1) art. singular definite article. Yu mu tapu a fensre noso a alen o wai kon in'sei. (You need to shut the window or else the rain will blow in). 2) art. also used with collective or non-count nouns. Fosi yu stampu a pinda, yu mu wai a buba puru.
abani n. scoundrel, outlaw, criminal.
Abeniba n. ritual name for a woman born on Tuesday. SEE TABLE UNDER: deinen.
abi v. have. Yongu, yu no abi ai fu si? (Boy, don't you have eyes to see?).
abi fu have to, must. Ala pikin fu fo yari abi fu go na skoro. (All children four years old and up have to go to school). SYN: musu1.
no abi fu don't have to. I no abi fu waka yu wawan, mi sa kon nanga yu. (You don't have to walk alone, I'll come with you). USAGE: In everyday speech it is commonly pronounced naf. VARIANT: nafu.
abi bere be pregnant; be expecting.
abi bigi-ai be jealous.
abi frikowtu have a cold or an upper respiratory infection.
abi krin skin be a lucky person.
abi prati have a share in something.
abi prisiri enjoy, have pleasure in.
aboma n. anaconda. Eunectes murinus (Boidae). Also known as watra-aboma. VARIANT: boma.
abongra n. sesame seed. Sesamum indicum (Pedaliaceae).
abra 1) v. cross, cross over. Fosi yu ben e pai den botoman wan kwartyi fu abra a liba. (You used to pay the boatmen a quarter to cross the river). 2) v. pass an exam or a grade in school. Efu yu wani abra, yu mu leri yu les. (If you want to pass, you must study your lessons). 3) prep. across from. Mi e tan abra a kerki. (I live across from the church). 4) prep. over. Den plane no mag frei abra a foto. 5) prep. through. 6) prep. about. Den boi na tapu uku e taki abra a nowtu fu a kondre.
gi abra hand over, surrender.
gi ensrefi abra surrender oneself, give up.
koti abra cross over, traverse. Yu mus leri a pikin fu luku bun fosi a e koti strati abra.
lon abra overflow, run over.
abrasei n. other side, opposite side. Esde mi go koiri na abrasei. (Yesterday I took a trip to the other side of the Suriname River).
abrasei fu opposite, across from.
abrawatra n. overseas, other countries. Tamara mi sisa e go na abrawatra. (Tomorrow my sister is going abroad). SYN: dorosei kondre.
adyosi n. goodbye, farewell. Adyosi na wan wortu di tranga fu taki. (Farewell is a hard word to say). CPART: odi. SEE: morgu; kuneti; nafun.
taki adyosi say goodbye. Wakti, mi wani bari den sma adyosi.
Adyuba n. ritual name for a woman born on Monday.
af'afu adv. partially, in part, half-heartedly, so-so. A frow disi noiti a e kba en wroko. A e libi en af'afu. (This woman never finishes her work. She leaves it half-done).
afdaki n. lean-to, shelter, small simple house. Di un ben go onti, un meki wan pikin afdaki fu sribi. (When we went hunting we made a small shelter to sleep under).
afen interj. okay.
Afiba n. ritual name for a woman born on Friday.
afkati1 n. lawyer, barrister. Te den go na krutu-oso, a afkati e taki gi a man. (When they go to the courthouse, the lawyer speaks for the man).
afkati2 n. avocado. Persea americana (Lauraceae).
afkodrei 1) n. non-christian religious practices, idolatry. SYN: bonu. 2) adj. refers to people who participate in non-christian religious practices.
afo 1) n. great-grandparent. CPART: afopikin. 2) n. ancestor. CPART: bakapikin.
afopikin n. great-grandchild.
af'pasi adv. part way (with distances); halfway, not finished (with things). Mi no o rei so fara, ma mi kan poti yu af'pasi. (I am not driving that far, but I can take you part of the way).
Afrikakondre n. Africa. SYN: nengrekondre.
afrontu v. offend, insult, affront. A boi denki tak' a tòf. Dat' meki a e taki sani san e afrontu Gado nanga libisma.
af'sensi n. half cent piece.
afu 1) num. half. 2) num. a part or portion of something. Baka te den gronman koti a aleisi, den e kibri afu fu a padi fu prani baka.
afu yuru a short time, a few minutes (literally: a piece of an hour).
afupasi adv. part way; halfway.
agama n. any of various kinds of small iguanas or large lizards.
agen adv. again. Mi Gado, mi Masra, luku! Agen den kon poti mi na tesi. SYN: ete wan leisi; baka4.
agersitori n. parable. Di Yesus leri den sma, a leri den nanga agersitori. (When Jesus taught the people, he taught them with parables).
agida n. a long drum with a low tone (used in Winti religion to call spirits). GEN: dron.
agidya n. South American tree porcupine. Also known as dyindyamaka.
a-gi-uma-nen n. variety of hot pepper. Capsicum frutescens.
agra n. bullet, shotgun shot, shrapnel.
agri v. agree. Billiton nanga Suralco agri fu opo a moni fu den wrokoman. (Billiton and Suralco have agreed to raise the wages of the workers).
agu n. pig, hog. Sus scrofa (Suidae).
agumeti n. pork.
agupen n. hog shed, pigpen, pigsty.
agutere n. salted pig's tail.
aguti n. orange-rumped agouti. Also known as konkoni.
ai1 n. eye. A smoko meki mi ai lon watra. (The smoke made my eyes water).
ai na ai face to face. Mi e meki ala muiti fu kon na yu, bika mi angri fu si yu ai na ai.
de na ai 1) be awake. 2) be alert, be on one's guard.
de nanga krin ai be sober, able to think clearly, self-controlled.
doro na ai underestimate.
iti wan ai tapu take a look at something, keep an eye on someone.
nanga krin ai wide awake.
no man si na ai hate, can't stand someone.
ori ai na tapu keep an eye on something or someone.
piri ai to look at with wide open eyes.
piri ai gi pay close attention to.
saka yu ai look down, lower one's eyes.
tan na ai stay awake.
ai2 n. kernel (of corn, rice, etc.), grain.
ai3 interj. yes.
ai4 contr. contraction of 3rd person singular a and continuous marker e.
ai buba n. eyelid.
ai wiwiri n. eyelash.
aifutu n. ankle.
aira1 n. gray-headed weasel. Eira barbara.
aira2 adj. shrewd, crafty.
Aisa n. earth goddess (Winti religion). SYN: gronmama. VARIANT: Maisa; Mama Aisa.
aiti num. eight.
di fu aiti adj. eighth.
aitidei n. service held for the dead eight days after burial.
aitifi n. eyetooth, canine tooth.
aitikanti n. leatherback sea turtle. Dermochelys coriacea. Also known as siksikanti.
aititenti num. eighty.
aka1 1) n. hook, fish hook. 2) v. secure something with a hook. Aka a doro gi mi, noso dyonsro a o naki tapu. 3) v. trip.
aka ensrefi choke.
tan aka repeat a grade at school.
aka2 n. any kind of bird of prey (hawks, eagles, falcons, ospreys).
akanswari n. someone or something that eats a lot; glutton. SYN: nyanman.
akatiki n. stick with a hook used to pull back grass when cutting.
akruderi 1) n. agreement. Lanti meki wan akruderi nanga den datra. 2) v. agree. SYN: agri. VARIANT: kruderi2.
aksi1 n. axe. A man kapu a bon nanga wan aksi.
aksi2 1) v. ask, request. Ifrow aksi mi san meki mi kon so lati. 2) n. question, request.
aksi-aksi v. ask around, ask continually.
Akuba 1) n. ritual name for a woman born on Wednesday. 2) n. wife of Anansi in Creole folktales.
akuba-dyendyen n. chamber pot, potty. SYN: pis'patu.
ala 1) adj. all. Den pikin nyan ala a froktu ini a baki. 2) adj. each, every.
ala dati conj. in fact.
ala fa conj. even though, in spite of the fact.
ala gado dei every single day (emphatic).
ala leisi every time.
ala sei everywhere, every part.
ala sma everyone.
ala ten always, every time.
ala tu both.
ala yuru again and again, all the time, always.
aladei adj. everyday, common, ordinary. A no wan aladei sani fu go na President oso.
aladi conj. although, even though. Aladi mi bari a pikin, toku a lon go na strati.
alakondre adj. consisting of a variety of colors or things.
alamala prn. all, everyone, everything. Un alamala o go tide na foto.
alanya n. sour citrus fruit. Citrus aurantium.
alanyatiki n. twig from a sour orange tree.
alape adv. everywhere. Alape yu e go, yu e feni konkruman.
alata n. general name for a variety of rats.
alatakaka-pepre n. a kind of hot pepper.
alatapasi n. narrow path.
alatapepre n. hot pepper.
alatasneki n. tan racer snake.
alatria n. vermicelli.
sneisi-alatria n. Chinese vermicelli.
aleisi n. rice. Oryza sativa.
wan ai aleisi a grain of rice.
aleisigron n. rice field.
aleisimiri n. rice mill.
aleisimiti n. mite found in rice products.
aleisisaka n. rice sack.
alen n. rain. Alen e fadon. (It's raining). A alen wai pikinso.
fin'fini alen drizzle.
alen-aka n. laughing falcon.
alenbaki n. rain barrel, water container.
alenbari n. rain barrel, water barrel.
alenbo n. rainbow.
alendyakti n. raincoat.
alenten n. rainy season (mid-April to mid-July; late Nov to mid-Feb).
alenwatra n. rain water.
altari n. altar (church language; in Winti religion referred to as tafra).
Aluku n. tribe of Bush Negroes (Boni) on the Lawa River.
alwasi conj. no matter what, regardless. SYN: awinsi.
amaka n. hammock.
amalan n. salted Chinese plum snack.
amandra1 n. tonsils.
amandra2 1) n. fruit of Java almond. 2) n. almond.
amandrabon n. Java almond tree.
Amba n. ritual name for a woman born on Saturday.
ambegi v. worship, adore. SYN: begi2; anbegi.
ambeiri n. hatchet, meat cleaver. FROM NL: handbijl.
ambra n. hammer. VARIANT: amra.
ambrabasi n. chairman.
Amerkan 1) n. American. 2) adj. American.
Amerkankondre n. United States of America.
ameti n. ham.
amsoi n. bitter greens, Chinese cabbage. Brassica chinensis.
Anana n. supreme deity in Winti religion.
Anansi1 n. trickster in Creole folktales.
anansi2 n. spider.
kisi anansi said of a leg/arm going to sleep (tingling sensation).
anansi-oso n. spider egg sack.
anansititei n. cobweb, spiderweb.
anansitori 1) n. spider tales. 2) n. tall tale, fable. SYN: leitori.
anbegi v. worship, adore (variant of ambegi).
anga1 1) v. hang. Luku a boi san e anga ini a bon dape. 2) v. hang something up. 3) v. lean. 4) v. hang around, associate with. 5) v. cheat someone.
anga go na wan sei list, lean to one side, tilt.
anga-anga 1) adv. listless. 2) v. describe child listlessly leaning. 3) v. hang up in disorderly way.
angalampu n. hibiscus flower. Hibiscus schizopetalus.
angatitei n. vine, creeper.
anyisa 1) n. traditional woman's headdress (lont'ede, otobaka, let-dem-tok, pawtere). 2) n. cloth used to make headscarf.
anyumara n. giant trahira fish. Hoplias macrophthalmus.
aparti adv. privately, special. Mi taki aparti nanga a basi.
aparti fasi in a special way, extra special.
poti aparti set aside, set apart.
apinti n. round drum (30-70 cm tall) used to send messages between villages.
apra 1) n. apple. 2) n. Java apple. 3) n. star apple.
aprabakba n. short fat sweet banana.
aprabon n. apple tree.
apresina n. orange (fruit). Citrus sinensis.
apteiki n. pharmacy, drug store. FROM NL: apotheek.
apuku n. spirit associated with the jungle.
Arabiri n. Arab, person of Middle-Eastern descent.
arakaka n. scorpion mud turtle / spot-legged turtle.
arki 1) v. listen. Ala neti mi e arki nyunsu na radio. 2) v. listen (obey).
arkiman n. listener.
Arwaka n. Arawak (Amerindian) person / Arawak.
Arwakatongo n. Arawak language.
asaw n. elephant.
asege n. rhinoceros beetle.
asema n. vampire.
asi 1) n. horse. Equus ferus. 2) n. medium through whom spirit reveals itself in Winti.
asin n. vinegar.
poti tapu asin pickle in vinegar.
asipen n. horse stable.
asisi n. ash. Fosten den sma ben lobi wasi den mofo nanga asisi.
asiwagi n. horse cart.
asranti adj. insolent, impudent, sassy, bold, cheeky. Mi sabi fa en mofo asranti! VARIANT: sranti.
ati1 1) n. heart. 2) n. guts, courage. 3) n. hard spot in banana.
ati bron be angry; mad. Mi ati e bron nanga a boi. SYN: mandi.
ati de na dyompo be nervous, anxious. SYN: dyompo-ati.
ati sidon be at ease, satisfied.
broko ati be deeply disappointed, brokenhearted.
go na ati be satisfied about something.
kowru ati calm down. No tyari yu atibron kon dya. Kowru yu ati fosi.
lasi ati lose heart, lose courage. SYN: lasi howpu.
ori na ati hold a grudge.
teki na ati take something to heart.
ati2 n. hat (general term). FROM ENG: hat.
ati3 1) v. hurt, be painful. 2) v. sorry, hurt. 3) v. regret, be sorry.
atibron n. anger. No tyari yu atibron kon dya. Kowru yu ati fosi.
kuku fu atibron seethe with anger.
puru atibron tapu take out one's anger on someone/something.
at'oso n. hospital.
awansi conj. although, even if. SYN: awinsi.
awara n. yellow-orange fruit of awarabon. Astrocaryum vulgare.
awarabon n. awara palm tree.
awari n. common opossum. Didelphis marsupialis.
awaridomri n. hypocrite. SYN: hoigriman.
awinsi conj. although, even if. Un wakti mi aiti yuru. Awinsi mi no doro ete, un mu tan wakti mi.
awinsi fa conj. even though, in spite of the fact, no matter how.
awinsi san conj. no matter what, irregardless of.
ayun n. onion. Allium cepa.

Ba1 title. mister; brother (Brer). Opa ferteri unu wan tori fa Anansi ben rei Ba Tigri.
baba 1) v. drool. 2) n. drool, saliva, slobber.
babari n. noise, racket, tumult. Heri neti den e meki babari. SYN: b'bari; bar'bari.
babatiki n. teething-ring, chewing stick for babies.
babaw 1) adj. dumb, mute. 2) adj. stupid, dim-witted. 3) adj. speechless. 4) v. be stupefied or in a daze.
babawman n. mute person / dimwit.
babun1 n. red howler monkey. Alouatta seniculus.
babun2 n. Hindustani man. SYN: kuliman.
babun-aka n. black-collared hawk.
babun-nefi1 n. sickle.
babun-nefi2 n. kind of grass with sharp edges.
babywagi n. baby stroller.
bada v. bother, worry, be annoyed. Libi en, no bada. SYN: span; weri2.
bagasi 1) n. baggage, luggage. 2) n. things. Go teki den bagasi fu yu kon.
bai v. buy, purchase. Mi e go bai gruntu na wowoyo.
baiman n. buyer, customer, purchaser.
baisigri n. bicycle.
baka1 n. back. Mi baka e hati mi!
broko yu baka get into trouble.
drai baka gi turn one's back on, reject.
hari baka lay down to rest.
ori baka support.
baka2 1) v. fry in a pan. 2) v. bake in an oven.
baka3 1) prep. behind. 2) prep. after. I mu kon baka fo yuru.
de na baka be behind.
go baka return, go back.
go na baka regress, decline.
libi na baka leave behind.
ori na baka withhold, hold back, restrain.
tan na baka remain behind, be left behind.
baka4 1) adv. again, anew. 2) adv. in return, back.
baka5 v. earn a lot of money.
baka agen adv. yet again (expresses frustration).
baka dati conj. after that, then.
baka di conj. after. Baka di mi kmopo fu wroko, alen kon.
baka-anu n. elbow.
bakabaka 1) adv. secretly, sneakily. 2) adv. behind someone's back. 3) adv. afterwards.
bakabana n. ripe plantain fried in oil.
bakabini n. slum; neighborhood far from main road.
bakabirti n. slum.
bakabonyo n. backbone, spine.
bakabreki n. early afternoon (1 PM to 4 PM).
bakadan 1) n. dike/levee behind settlement. 2) n. euphemism for buttocks.
bakadina n. mid to late afternoon (3 PM to 6 PM).
bakadoro n. back door. CPART: fes'doro.
bakadyari 1) n. backyard. 2) n. euphemism for buttocks.
baka-ede n. back of the head.
bakafensre n. window on backside of house.
bakafinga1 1) n. bribe or bonus. 2) n. second job, moonlight job.
bakafutu 1) n. heel. 2) n. hind leg of an animal.
bakafutu-titei n. Achilles tendon. VARIANT: bakatitei2.
baka-iri n. heel, back of the heel. SYN: bakafutu.
bakaman 1) n. member, follower, supporter. 2) n. advisor, assistant. 3) n. spy.
bakaneki n. backside of neck, nape.
bakanen n. last name.
bak'anu n. elbow.
bakapasi n. back road.
bakapikin n. descendant. CPART: afo.
bakasei 1) n. back part, back side. 2) adj. behindmost. 3) n. euphemism for buttocks.
en bakasei teki faya fall out of favor.
bakaten adv. later on, afterwards.
bak'ati n. backache.
bakatifi n. molar tooth.
bakatitei1 n. defense, rearguard.
bakawan n. the one in back, straggler. ANT: fesiwan.
bakawowoyo n. backside of central market in Paramaribo.
bakayari n. first few weeks of the new year.
bakayesi n. back side of the ear.
bakba n. banana. Musa species. Bananas for cooking are called bana. SPEC: aprabakba; banabakba; ingibakba; pikinmisi-finga bakba; sukrubakba.
bakba wenkri n. chaotic place (lit: banana shop/zoo).
baki n. flat wooden tray, crate.
bakra 1) n. person from the Netherlands. 2) n. white person. 3) n. person with authority.
bakra fasi in a Dutch manner.
bakrakondre n. the Netherlands, Europe in general. SYN: Ptata1.
Bakratongo n. Dutch language.
bakriman n. baker.
bakri-oso n. bakery.
bakru 1) n. short spirit with a big head. 2) v. have strong compelling desire for something.
baksis n. bonus, extra given when buying something.
balata1 n. rubber, white sap from rubber tree.
balatabon n. rubber tree.
balataman n. rubber tapper.
baleta n. billy club; v. hit with a billy club.
bami n. fried noodles with meat and vegetables.
bana n. plantain, cooking banana. Musa species.
bakabana ripe plantain fried in oil.
ger' bana plantain peel turned yellow, flesh firm.
grit'bana supu soup made with grated plantain.
grun bana unripe green plantain.
lep' bana ripe yellow plantain with black spots.
los'bana green plantain roasted in hot coals.
banabakba n. long mild banana grown for export and local consumption.
banabeki n. cacique bird (yellow-rumped / red-rumped).
banabon n. banana tree.
banawatra n. sap from banana/plantain stem (stains skin/clothes).
bangi1 n. bench, stool. Temreman oso no abi bangi.
bangi2 n. sandbank.
bangi3 n. bank (financial). Mi e go broko mi moni na bangi.
banknotu n. fifty cents.
banti1 1) n. tire. 2) n. belt, waist band. 3) n. strap. 4) v. fasten with belt. 5) v. bind, constrict.
banti hori strap something down.
banti2 n. trick. A man tya banti.
banti3 adj. drunk.
barba n. beard.
brabakoto v. barbecue, smoke meat or fish over charcoal fire.
bari1 n. barrel, drum, vat.
bari2 1) v. shout, make loud noises (humans, animals, engines). 2) v. broadcast, announce. 3) v. warn, command. Mi ben bari yu, ma yu no yere.
bari adyosi say goodbye.
bari boskopu broadcast, announce.
bari odi greet, say hello to.
bari wroko v. announce officially.
barki1 n. beam of wood (4x4, 6x6, etc).
barki2 n. one hundred dollars / guilders.
barki3 n. boat.
basi1 1) n. boss. 2) v. boss, keep under control. A no man basi en tongo.
basi2 n. bark of a tree, husk of a nut/coconut.
baskita n. woven reed basket.
basra adj. of mixed race, bastard, mongrel.
batra n. bottle, jar. FROM ENG: bottle.
batyaw n. salted fish (cod/catfish).
baya interj. used to get attention or emphasize a point. Baya, tamara yu no mu kon!
Bedaki n. Christmas, Christmas season. SYN: Kresneti.
bedi 1) n. bed. 2) n. raised garden bed for planting.
bedoi v. give directions. FROM NL: beduiden.
bedrigi v. cheat, deceive. FROM NL: bedriegen.
bedrigiman n. cheater, swindler, deceiver.
begi1 1) v. beg. 2) v. ask with respect, beseech, request.
begi2 1) n. prayer, request. 2) v. pray. 3) v. worship. SYN: ambegi.
begiman n. beggar.
beifi v. shake, shiver, tremble. FROM NL: beven.
beifi-ati n. fearfulness, anxiety, nervousness. SYN: dyomp'ati.
beiri n. axe. SYN: aksi1. FROM NL: bijl.
beitri n. chisel. FROM NL: beitel.
beki n. large oval tub made from zinc/plastic.
bèl v. call on the telephone. FROM NL: bellen.
bemui 1) v. meddle, pry into. 2) adj. curious. SYN: mumui. FROM NL: bemoeien.
ben aux.v. past tense marker (indicates past time). Mi ben de na at'oso.
benawtu adj. humid, sultry, stifling. FROM NL: benauwd.
beni 1) v. bend. 2) v. turn, change direction. 3) n. bend, curve. 4) adj. bent. 5) v. dribble past an opponent (sports).
beni strafu serve time in prison.
ber'ati n. stomachache, abdominal pain.
bere1 1) n. stomach, belly, abdomen. 2) n. womb, uterus. 3) n. pregnancy, fetus. 4) n. waist. 5) n. inside.
abi bere be pregnant.
gi bere impregnate.
kisi bere become pregnant. SYN: ori bere.
langa bere have an insatiable appetite.
lasi bere miscarry. SYN: trowe bere.
puru bere abort a pregnancy.
bere2 n. large intestines of cow/pig prepared with spices.
bere koti sudden urge to use toilet with abdominal cramps.
berebanti n. abdominal support belt worn after childbirth.
berefamiri n. extended families related through common ancestry/plantation.
berefuru adj. unimportant.
bereketi n. magical chain worn around waist for healing/protection.
berekofu n. punch in the stomach.
bereman n. pregnant woman. SYN: bere-uma.
Bergi1 n. Belgium.
bergi2 n. mountain, hill. FROM NL: berg.
bergibergi adj. mountainous, hilly.
bergikaiman n. Schneider's cayman. Paleosuchus trigonatus.
bergikeskesi n. weeper capuchin monkey.
bergi-olo n. cave.
bergipresi n. mountainous area.
bergiskin n. mountainside, side of a mountain.
beri 1) v. bury. 2) n. funeral, burial.
beri en gi wan sma 1) let someone down. 2) report someone to authority.
berpe n. cemetery, graveyard. SYN: bonyogron.
besnei 1) v. circumcise. 2) adj. circumcised.
besroiti 1) n. decision. 2) v. decide.
teki wan besroiti make a decision.
besun n. large cassava bread.
beti 1) v. bite. 2) n. bait. 3) v. prickle, give a tingling sensation.
feni wan beti receive a tip; stroke of good luck.
betre 1) adv. better. 2) adv. preferable. 3) v. heal, get better.
beweigi 1) v. move. 2) n. movement, motion.
bifo conj. before. SYN: bifosi.
bifosi conj. before.
bigi 1) adj. big, large, great. 2) adj. old.
meki bigi boast, brag. SYN: skepi.
bigi-ai n. greed, envy.
abi bigi-ai be jealous or envious.
bigibigi dei broad daylight.
bigidagu n. rich or important person. SYN: bigiman; bigifisi.
bigidoi n. thumb or big toe.
bigifasi n. pride, haughtiness, arrogance. SYN: bigimemre.
bigifisi n. important person.
bigifutu1 n. leg afflicted with filaria, elephantiasis. SYN: bimba.
bigikuyake n. red-billed toucan.
bigiman 1) n. adult man. 2) n. important person, VIP.
bigimarkusa n. giant passion fruit (up to 25 cm long).
bigimemre 1) n. pride, arrogance. 2) adj. arrogant, proud.
abi bigimemre be proud or arrogant.
bigin 1) v. begin, start. 2) n. beginning, start.
bigi-popokaisneki n. emerald tree boa.
bigisensi n. 2 1/2 cent piece (colonial coin).
bigisma 1) n. adult, parents, older person. 2) n. ancestors.
bigitaki n. impolite speech, sassing.
gi bigitaki speak impudently, sass.
bigitodo n. giant toad. Bufo marinus.
bigiwan n. large or important ones. CPART: pikinwan.
bigi-watradagu n. giant otter. Pteronura brasiliensis.
bigiwowoyo n. central market in Paramaribo.
bigiyari n. milestone birthday (1st, 5th, 10th, 15th, etc.).
bika conj. because. SYN: fu di; bikasi.
bimba n. elephantiasis, filaria leg. SYN: bigifutu1.
birambi n. bilimbi fruit. Averrhoa bilimbi.
birfrow n. neighbor woman.
biri n. beer.
birman n. neighbor man.
birti 1) n. neighborhood. 2) n. surrounding area. 3) n. neighbor.
birtisma n. neighbors, people in neighborhood.
bisa n. bearded saki monkey.
bisi1 n. business, concern.
no abi bisi don't mind, doesn't matter.
San bisi yu? / O bisi yu? What's the matter with you?
bisi2 n. things, belongings. SYN: taitai; pototo; bagasi.
bita 1) adj. bitter tasting. 2) n. herbal medicine/purgative. 3) n. strong alcoholic beverage.
bitakasaba n. bitter cassava, manioc.
bitawiwiri n. bitter green leafy vegetable.
biten adv. in time, in plenty of time.
blaka 1) adj. black. 2) v. blacken, polish. 3) v. speak evil of, malign.
naki wan blaka make a blunder.
blaka doti n. potting soil.
blaka sneisi n. black man with Chinese surname.
blaka-ai pesi n. cowpea, black-eyed pea.
blakabal n. maligning someone.
blaka-ede tingifowru n. black vulture.
blakakaiman n. black cayman.
blakaman n. black man, Negro. SYN: nengre.
blakamarkusa n. passion fruit variety.
blakanengre n. black-skinned creole.
blakapan n. cast-iron skillet.
blakapatu n. cast-iron pot.
blakapepre n. black pepper.
blakapina n. hair pin.
blaw adj. blue.
blawforki n. blue-gray tanager.
blawkepanki n. purple gallinule bird.
blesi 1) v. bless. 2) n. blessing. 3) adj. blessed.
bo1 aux.v. would have (conditional past/future: ben + o).
bo2 n. bow (for arrows).
bobi n. breast.
bobi wan manya suck juice out of mango.
bobimerki n. breast milk.
bobimofo n. nipple.
bobo 1) n. weakling, sissy. 2) adj. weak, sissy.
boboi v. rock in a cradle, calm child by rocking.
bofru n. South American tapir.
bogobogo adj. plenty, in abundance. SYN: furu; hilahila.
boi 1) n. boy. 2) n. son.
boiti1 n. rural area, country, outlying area.
boiti2 1) conj. except for. 2) conj. besides.
boketi n. bouquet of flowers.
bokoboko n. male goat, ram.
bokrafru n. scarlet macaw.
bokru adj. hunchbacked.
bòks v. collide, crash, run into. SYN: naki.
boktu n. bend in road, curve, corner.
anga wan boktu take a turn at high speed.
koti wan boktu turn a corner.
boktuboktu 1) adj. winding, twisted. 2) n. curves, turns.
bokun n. red herring (salted & smoked).
bon n. tree.
bonboni n. Guianan tree squirrel.
bonbuba n. tree bark.
bondru n. bundle of things.
bondru kon na wan bind together, unite.
bonfutu n. shin.
bongo n. kind of drum.
bongro n. trash, rubbish, garbage.
bonk v. throw.
bonki 1) n. string bean, green bean. 2) n. imported beans (brown/white).
bonkitiki n. bean stakes/sticks.
bontara n. sap or resin from a tree.
bonu 1) v. appease spirits, call on spirits. 2) v. cast a spell.
bonuman n. spirit medium, healer, medicine man, obeah man.
bonuwroko n. religious rituals in Winti cult. SYN: afkodrei.
bonyo n. bone.
bonyogron n. cemetery. SYN: berpe.
borgu1 1) n. citizen. 2) de ini borgu be in civilian clothes.
borgu2 v. buy or sell on credit, loan.
bori v. cook, boil. Ala dei mi mama e bori fosi a go na foto.
boriman n. cook. SYN: koki.
boro1 1) v. drill, bore, puncture. 2) n. drill bit. 3) adj. punctured.
boro2 1) v. cut in line, slip in. 2) v. take a shortcut. SYN: koti pasi.
boro psa 1) v. come by, visit. 2) v. pass through, pierce.
boropasi n. shortcut.
borsu n. chest, breast.
boru n. bun, sweet roll, donut.
bòs v. burst. A banti bòs!
boskopu 1) n. errand, message, announcement. 2) bari boskopu broadcast. 3) du wan boskopu run an errand.
boskopuman n. messenger, errand boy.
bosro 1) n. brush. 2) v. brush, scrub.
bosroko n. T-shirt, undershirt.
bosu 1) n. bunch, bundle, cluster, stalk of bananas. 2) n. group of people, swarm of insects, school of fish.
boto n. boat.
botobangi n. carved wooden boat bench.
boto-ede n. bow of a boat.
botoketi n. mooring chain.
botoman n. boatman, crew member.
botri n. kitchen, pantry. SYN: kukru.
botro n. butter, margarine.
bow v. build.
bow tapu put one's trust in someone/something.
bowston n. cement block, brick.
bowtu1 n. thigh.
tapu wan sma bowtu sit on someone's lap.
bowtu2 n. threaded bolt.
bowtu3 1) n. lumber (2x4, 4x4). 2) v. bar a door. 3) v. hit with a piece of wood.
bowtu4 adj. selfish, miserly, stingy.
bowtu5 1) v. catch, grab. 2) v. arrest.
boyo n. cassava & coconut cake.
brada n. brother.
bradi 1) adj. wide, broad. 2) v. spread out.
bradi-edeman n. highly educated person.
bradyari adj. noisy. SYN: dyugudyugu.
brafu n. soup made from fish or game with tubers.
brai v. fry. SYN: baka2.
brantimaka n. cat's claw plant.
brasa 1) v. embrace, hug. 2) n. embrace, hug.
Brasyon n. Brazil.
brede n. bread, rolls.
brede buskutu toasted hard bread.
bredebon n. breadfruit tree.
bredebuba n. bread crust.
bredefutu n. flat feet.
breki 1) n. bleach. 2) v. bleach, whiten.
brekten n. noontime (12:00 to 3:00 PM).
breni 1) adj. blind. 2) v. make blind.
brenki 1) adj. shiny, glossy, polished. 2) v. shine, polish.
bri v. believe (short for bribi).
bribi 1) v. believe. 2) n. belief, faith.
bribisma n. believer.
brifi n. letter.
bro 1) v. breathe. 2) n. breath. 3) v. blow. 4) v. rest.
bro de na tapu be out of breath.
bro syatu be short of breath.
bro tapu die (euphemism).
hari bro breathe deeply.
broko1 1) v. break, destroy. 2) adj. broken. 3) v. deflower. 4) v. break of day, dawn. 5) v. pick fruit. 6) v. dilute liquid. 7) v. divide into smaller portions.
broko2 1) v. exchange money. 2) v. make change.
broko ati be deeply disappointed.
broko ede worry.
broko kindi bow slightly by bending knees.
brokobaka n. birdsnake.
brokobatra n. broken glass.
brokobere n. diarrhea. SYN: wrokobere; lus'bere.
brokobroko 1) v. break into pieces. 2) adj. broken, crumbly. 3) v. explain.
brokodei 1) n. dawn, sunrise. 2) n. all-night party/wake.
broko-oso n. shack, broken-down house.
brokosaka adj. depressed, ashamed, gloomy.
brom n. small motorcycle, moped.
bromki n. flower.
bromkipatu n. flowerpot, vase.
bron 1) vi. burn, burn out. 2) vt. burn. 3) v. break one's word.
bronbron 1) adj. burned. 2) n. burned rice at bottom of pot.
bronsoro n. burn wound.
brotyas v. broadcast.
brudu 1) n. blood. 2) n. blood pressure.
brudutitei n. blood vessel, artery, vein.
bruku n. pants, trousers.
bruya 1) n. confusion. 2) v. confuse, make a mess. 3) adj. confused, messy.
buba n. skin, peel, scales.
bubu1 n. filaria leg swelling. SYN: bigifutu1.
bubu2 n. bogeyman, fake monster to scare kids.
bugru 1) n. metal ball, bearing. 2) n. ball-bearing.
bui 1) n. bracelet, chain. 2) n. handcuff. 3) v. handcuff.
buku1 n. book.
buku2 1) n. mould, mildew. 2) v. mould. 3) adj. musty, stale.
buku3 1) v. butt (animal). 2) v. bump, shove. 3) adv. with great speed.
buku kon approach very quickly.
buku psa speed by, pass fast.
bukundu v. bend down, stoop down.
bulu n. bull, ox. SYN: burkaw.
bun 1) adj. good, correct. 2) adv. well, correctly. 3) adj. big, terrible. 4) adv. terribly, very much. 5) n. favor, good deed.
bun furu adj. very much, in abundance.
bun-ati 1) n. grace, goodwill. 2) adj. gracious, good-natured.
bunbun 1) adv. safe and sound. 2) adv. very well. 3) adj. very good.
bunkopu adj. inexpensive, cheap. ANT: diri.
buriki n. donkey.
burkaw n. bull, ox. SYN: bulu.
buru 1) n. descendant of Dutch farmers. 2) n. white person. 3) n. farmer. SYN: gronman.
busbusi 1) n. overgrown bush. 2) adj. overgrown.
busi n. jungle, bush, forest.
bus'kondre n. jungle area, interior of Suriname.
bus'kondresma n. inhabitant of the interior.
buskutu n. toast.
bus'meti 1) n. wild animal. 2) n. wild game meat.
butu 1) n. fine, penalty. 2) v. pay for wrongs done. 3) v. fine.

da art. variant of a (church language).
dagadaga n. machine gun.
dagu n. dog. Canis familiaris.
fu naki dagu in abundance.
daguwesneki n. boa constrictor.
dala 1) n. dollar. 2) n. 2 1/2 guilders coin/note.
dalèk adv. soon, directly, right away. FROM NL: dadelijk.
dampu 1) n. steam, mist, vapor. 2) v. give off steam. 3) n. foul smell.
dan1 conj. then (succession of events).
dan fosi only then.
dan2 n. dike, levee, seawall.
dangra 1) adj. difficult to understand, confusing. 2) v. perplex, bother.
danki n. thank you. PREFERRED: tangi.
dansi 1) v. dance. 2) n. dance, dance party.
drape adv. there. ANT: dya.
dati1 1) dem.prn. that, those. 2) dem.prn. emphasizes personal pronoun.
dati2 1) conj. that. 2) conj. so that.
datra n. doctor, physician.
datra-oso n. clinic, doctor's office.
de1 1) v. to be, exist. 2) v. to be present.
de2 aux.v. progressive aspect marker (variant of e).
de na ai 1) be awake. 2) be alert.
de na baka be behind.
dede1 1) v. die. 2) adj. dead. 3) n. dead person, corpse. 4) n. death.
dede na watra drown.
dede2 1) adj. dull, blunt (knife). 2) adj. lame, unusable (arm/leg). 3) adj. boring.
dedebonyo n. skeleton.
dedeboskopu n. obituary notice.
dede-oso n. mourning service at home of deceased.
dei n. day.
bigibigi dei broad daylight.
tra dei recently, the other day.
a tra dei fu en the next day.
wan dei once, sometime, one day.
deibrede n. daily bread, food for the day.
deinen n. ritual birth names based on day of week (Sunday=Kwasi/Kwasiba, Monday=Kodyo/Adyuba, Tuesday=Kwamina/Abeniba, Wednesday=Kwaku/Akuba, Thursday=Yaw/Yaba, Friday=Kofi/Afiba, Saturday=Kwami/Amba).
deiten n. daytime.
dek'ati n. courage, bravery. SYN: man-ati.
deki 1) adj. thick. 2) adj. swollen.
dem art, prn. variant of den.
den1 prn. 3rd person plural (they, them, their).
den2 art. plural definite article (the).
denki 1) v. think. 2) v. think about. 3) n. thought, idea.
denksrefi refl.prn. themselves, each other.
di 1) conj. when, while (past). 2) rel.prn. who, that. 3) conj. because (fu di).
di fu prep. ordinal number prefix (di fu tu = 2nd, di fu dri = 3rd).
di psa ago (tu wiki di psa = two weeks ago).
dia n. deer.
didibri n. devil.
didon v. lie down, be in lying position.
didyonsro adv. just now (recent past).
difrenti adj. different, various.
diki 1) v. dig. 2) v. meddle.
diki puru gouge out, dig up.
dimamanten adv. this morning (6 AM to 12 PM).
dimusudei adv. early this morning (before daybreak).
dineti adv. tonight, this evening. SYN: tide neti.
dini 1) v. serve. 2) v. worship.
dip'bere adj. secretive, able to keep a secret.
dipi 1) adj. deep. 2) adj. profound, difficult to understand. 3) v. dip. 4) n. hidden meaning.
dir'diri adj. expensive, precious.
dirèk adv. right away, at once, immediately.
diri 1) adj. expensive. 2) adv. a lot. 3) adj. scarce/not seen for long.
disi dem.prn. this, these.
dis'ten n. nowadays.
distrikti n. district.
dobru 1) v. double. 2) adj. double. 3) adj. muscular.
dofuman n. deaf person.
dofu adj. deaf.
doksi 1) n. duck. 2) n. muscovy duck.
dompu 1) v. dump trash. 2) v. tip over. 3) v. limp. 4) v. outperform/beat.
domri n. pastor, priest, minister.
don adj. dumb, stupid. ANT: koni.
dondru 1) n. thunder. 2) v. thunder.
doni n. ten-cent piece, dime.
dopu1 1) v. baptize. 2) v. be baptized. 3) n. baptism. 4) v. initiate, use for first time.
dopu2 v. dip, dunk.
dor'ai n. disdain, scorn, contempt.
doro1 1) n. door. 2) n. doorway. 3) go na doro go out. 4) na doro outside.
doro2 v. arrive. Fa mi doro na oso, a alen bigin kon.
doro3 adv. continually, on and on.
go doro continue.
ori doro persevere, endure.
doro4 v. sift flour/powder.
dorodoro1 n. sieve.
dorodoro2 adv. thoroughly, through and through.
dorosei 1) n. outside, exterior. 2) adj. foreign.
dorosei kondre foreign country.
dosen n. dozen (12).
dosi n. cassava bread with sweetened coconut filling.
dosu n. box.
doti1 1) n. land, country, ground. 2) n. soil, dirt.
doti2 1) n. trash, rubbish. 2) adj. dirty, messy. 3) v. make dirty. 4) adj. mean, wicked.
dot'sani n. dirty dishes.
dot'taki n. obscene language.
dow n. dew, fog.
drai 1) vi. turn, spin. 2) vt. stir, turn. 3) v. capsize. 4) v. change, turn around. 5) v. function well, be successful.
drai baka turn back.
drai kon baka return.
drai libi repent, change one's ways.
drai lontu spin around, wander in circles.
draibere adj. dead (fish floating belly up).
draidrai 1) v. procrastinate. 2) v. hesitate. 3) v. wait around.
drai-ede n. dizziness, giddiness.
drape adv. there. ANT: dya.
drei 1) adj. dry. 2) vt. dry. 3) vi. dry out.
drei-ai n. impudence, audacity.
dreifisi n. dried fish.
dreigi v. tease, torment, vex.
dreineki n. thirst. neki drei = be thirsty.
dreiten n. dry season.
dren 1) v. dream. 2) n. dream.
dresi 1) n. medicine. 2) n. poison. 3) v. treat wound/sickness.
dresiman n. healer, medicine man.
dri num. three.
di fu dri adj. third.
dribi 1) v. float, drift. 2) v. shove, move over.
dridewroko n. Wednesday (3rd workday).
driktoro n. director, manager.
dringi 1) v. drink. 2) n. drink, beverage. 3) v. use up (fuel/energy).
dritenti num. thirty.
droifi n. grape.
dromofo n. threshold, doorstep.
dron n. drum.
dronman n. drummer.
dropu 1) n. drop. 2) v. drip. 3) v. administer drops. 4) v. reduce price/amount.
drungu 1) adj. drunk. 2) v. stun.
du v. do, act.
dukrun 1) v. dive. 2) v. hide, take cover. SYN: dòk.
duku 1) n. cloth. 2) n. money.
duman 1) n. man of action. 2) n. medicine man.
dungru 1) adj. dark. 2) n. darkness. 3) v. darken.
dungr'oso n. jail, prison.
dusun num. thousand.
dweiri 1) n. mop. 2) v. mop the floor.
dwengi v. force, coerce. FROM NL: dwingen.
dya adv. here.
dyadya adj. qualified through experience, real, genuine.
dyaf v. brag, boast. SYN: skepi.
dyakti n. jacket, coat.
dyam 1) n. trap. 2) n. difficult situation/jam. 3) v. hold back. 4) v. snub. 5) v. stall (engine).
dyamanti n. diamond.
dyamu n. jambolan fruit, java plum.
dyango adj. violent, tough.
dyap n. job, chore. naki dyap = do odd jobs.
dyari n. garden, yard.
dyarusu 1) v. be envious/jealous. 2) n. jealousy. 3) adj. jealous.
dyaso adv. right here.
dyeme 1) v. groan, moan. 2) n. groan, moan.
dyèns v. oppose, work against.
dyesi n. yeast.
dyindya n. ginger.
dyindyabiri n. ginger beer.
dyogo n. liter bottle of beer, jug.
dyompo1 v. jump.
dyomp'ati 1) n. anxiety, nervousness. 2) adj. nervous.
dyonko v. doze, doze off.
dyonsro adv. in a little while, soon. SYN: dalèk.
dyote 1) adj. mean, crooked. 2) v. cheat, swindle.
Dyuka 1) n. Aukaner (Bush Negro tribe). 2) n. Maroon.
dyuku 1) v. stab, jab. 2) v. dress up.
dyuku a rem slam on the brakes.

e aux.v. progressive aspect marker (is/are -ing).
ed'ati n. headache.
ede 1) n. head. 2) n. account, reason.
bro ede rest.
broko ede worry.
krasi ede worry.
piri ede shave head.
weri ede be a nuisance.
ede krasi adj. intelligent, smart.
edeman n. leader, boss.
edemoni n. tax. SYN: lantimoni.
edewiwiri n. hair on head.
efu conj. if.
efu noso conj. or if.
ei interj. hey (greeting/attention).
eigi adj. own. A man disi abi moni ma a gridi tumsi fu yepi en eigi m'ma.
eiginari n. owner.
eksi n. egg.
eksibuba n. eggshell.
eksikuku n. cake.
elen n. pickled herring.
embre n. bucket, pail.
empi n. shirt.
en 1) prn. 3rd person singular object (him, her, it). 2) poss.prn. his, her, its. 3) prn. emphatic he/she.
èn conj. and (used to connect clauses).
enki n. ink.
enkri adj. only, single. SYN: kodo.
ensrefi refl.prn. himself, herself, itself.
eri adj. all, whole. SYN: heri.
esbiten adv. right away, immediately.
esde n. yesterday. tra esde = day before yesterday.
es'esi adv. quickly, fast, rapidly. SYN: esi; gaw.
esi adv. quickly, fast.
espresi adv. on purpose, intentionally.
ete adv. still, yet.
ete wan leisi again.

fa1 1) adv. how, what, why. 2) conj. how.
fa a no fa 1) conj. even though, no matter how. 2) conj. one way or another.
fa2 1) conj. as soon as, right after. 2) conj. since, because.
fadon 1) v. fall, fall down. 2) v. spill.
fadon flaw faint, lose consciousness.
fakansi n. vacation.
faki n. square, box on form.
fala1 v. chop down. Pikin aksi e fala bigi bon.
fala2 v. ebb (low tide coming).
falawatra n. low tide.
famiri 1) n. family, relatives. 2) n. relative.
famiriman n. relative.
fanowdu adj. needed, necessary.
abi fanowdu v. need.
fanowdu sani things needed for Winti rituals.
fara adj. far. ANT: krosbei.
farawe adv. far away.
fas'fasi 1) v. touch all over. 2) v. stop frequently.
fasi1 n. way, manner, quality.
fasi2 1) v. touch. 2) v. consume, touch.
fasi3 v. get into a problem, quarrel.
fasi4 1) v. get stuck (in mud). 2) v. fasten, connect.
fasti adj. close, fast (friend); permanent.
fatu1 1) adj. fat. 2) n. cooking fat. 3) n. grease. 4) v. apply grease. 5) adj. fertile ground.
fatu2 n. joke.
prati fatu tell jokes.
tyari fatu be fun to be around.
faya1 1) n. fire, flame. 2) adj. hot. 3) adj. fierce, intense. 4) v. be angry.
koti faya spark, give off sparks.
poti faya gi set on fire, ignite.
sutu faya gi incite, egg on.
teki faya catch on fire.
faya2 1) n. light. 2) n. electricity. 3) n. electric bill.
faya3 n. lightning.
faya-ati adj. hot-tempered.
fayafaya 1) adv. zealously, fervently, vehemently. 2) adj. fervent, zealous.
fayalobi n. flame flower. Ixora species.
fayawatra n. hot beverage (tea, coffee, cocoa).
feifi num. five.
feifitenti num. fifty.
feiri 1) n. file. 2) v. file.
feni v. find, detect.
fensre n. window.
ferberde n. illusion, delusion.
ferbontu n. covenant.
ferferi 1) v. bother, annoy, pester. 2) v. be bored. 3) adj. annoying.
ferfi 1) n. paint. 2) v. paint. 3) adj. painted.
fergiti v. forget. VARIANT: frigiti.
fergitibuku n. bucket of neglect (lit: forget book).
ferleigi 1) adj. embarrassed, ashamed. 2) adj. shy.
ferlusu v. save, rescue.
ferlusuman n. savior, rescuer.
fermorsu v. waste, squander.
ferplekti 1) n. obligation, duty. 2) v. be responsible to do something.
ferstan 1) v. understand. SYN: grabu. 2) n. understanding.
kon ferstan realize.
fersteri v. congratulate.
ferteri v. tell (a story/news).
fertrow v. trust.
poti fertrow tapu put trust in.
ferwakti v. expect.
ferwondru 1) v. amaze, surprise. 2) adj. amazing, miraculous.
fesa n. party, celebration, feast.
fesadei n. holiday. SYN: feistedei.
fes'doro n. front door. CPART: bakadoro.
fes'ede n. forehead.
fesi1 n. face.
swa en fesi put on angry face, scowl.
fesi2 prep. in front of.
na fesi 1) previously. 2) in advance.
di de na fesi in front of, in the future.
go na fesi improve, advance, progress.
fes'man n. leader, director, boss.
fes'sei n. front side, in front. ANT: bakasei.
fet'bakru n. fighter-spirit; someone who loves to fight.
fet'feti 1) v. bicker, squabble often. 2) n. bickering.
feti 1) v. fight. 2) n. fight, war, battle. 3) v. disagree. 4) v. make an effort, hustle, hurry.
feti baka resist, fight back.
fet'man n. fighter.
fet'sani n. weapon.
fet'sipi n. warship.
feyanti n. enemy. ANT: mati.
figi 1) v. sweep. 2) v. wipe off. 3) v. forget (slang).
figi puru wipe away, erase.
figifutu n. doormat. SYN: matamata.
fin'fini 1) adv. in detail, small pieces. 2) n. details. 3) adj. thin. 4) v. cut/tear into small pieces.
fin'fini alen drizzle.
finga 1) n. finger, toe. 2) n. single banana/plantain.
sutu wan finga go na loktu raise one's hand.
fini 1) adj. skinny, thin. 2) adj, adv. fine, high quality. 3) n. point or essence of a matter.
finpeiri n. fireworks, firecracker.
firi 1) v. feel. 2) v. feel around for something. 3) n. feeling, premonition.
firi wan fasi feel embarrassed.
fir'firi v. feel around, grope.
fis'bonyo n. fishbone.
fis'boto n. fishing boat.
fisi 1) n. fish. 2) v. catch fish.
fisiti 1) n. visitor, guest. 2) n. comrade, friend. 3) v. visit. SYN: luku.
fis'man1 n. fisherman.
fisti adj. dirty, filthy.
fiti 1) v. fit. 2) v. try on. 3) adj. good, right, well-deserving.
fiti ai v. beautiful to look at.
flaka1 1) n. stain, blot, spot. 2) v. stain, spot.
flaka2 v. spy, keep an eye on.
flaw 1) adj. unconscious. 2) v. wilt.
fadon flaw faint.
flèi v. do something very quickly, hurry.
flit 1) n. insecticide spray. 2) v. spray insecticide.
fluku 1) v. curse. 2) n. curse. FROM NL: vloek.
fo num. four.
di fu fo adj. fourth.
fo-ai-awari n. four-eyed opossum.
fodewroko n. Thursday (4th workday).
fokanti 1) adj. square. 2) n. square.
fokofoko n. lungs.
folku n. people, ethnic group. SYN: pipel.
fon 1) v. hit, beat, spank. 2) v. thresh rice.
fon nanga mofo browbeat into silence.
fonfon n. beating, whipping.
fonsu n. fund, money collected.
forku n. fork.
foroisi n. living room, front room.
fos'fosi adv. formerly, in the past.
fos'fosi sani n. basics, fundamentals.
fosi 1) adj. first. 2) conj. before. 3) adv. earlier, in the past.
dan fosi only then.
fosi dati before that.
fosiwan n. first one.
fosten 1) adv. in the old days, in the past. 2) adj. old-fashioned.
foto 1) n. city. 2) n. Paramaribo city center.
fotoman n. someone from Paramaribo, city dweller.
fow 1) v. fold. 2) adj. bent, folded. 3) n. fold, crease.
fowru 1) n. bird. 2) n. chicken.
pikin fowru chick.
fowrudoti n. bird vine (mistletoe plant).
fowrukoi n. bird cage, chicken coop.
fowrumeti n. chicken meat.
fowtu 1) n. mistake, fault, error. 2) adj. wrong, mistaken.
frafra 1) adv. a little. 2) adv. do something quickly.
fraga n. flag.
fragatiki n. flagpole.
frak adj. large amount, a lot.
frambo n. torch.
Franskondre n. France.
fransman n. French-speaking person.
fransman-birambi n. carambola, starfruit.
Frans'sei n. French Guiana.
frantwortu 1) n. responsibility. 2) adj. responsible.
gi frantwortu account for, be responsible to.
franya 1) n. fringe. 2) v. cut or tear into ribbons.
frede 1) v. be afraid, fear. 2) v. scare, make afraid. 3) adj. fearful, scary. 4) n. fear. 5) adj. ugly.
fredefrede 1) adj. fearful. 2) v. be fearful.
fredeman n. coward.
frei 1) v. fly. 2) n. wing.
freida n. Friday.
freide n. peace.
freifrei n. fly (insect).
freiri 1) v. flirt, make out. 2) v. make love. 3) n. boyfriend/girlfriend, lover.
frekti 1) v. braid hair/baskets. 2) n. braid. 3) adj. difficult, complicated. 4) v. wrap around.
fremusu n. bat.
fri 1) adj. free, unfettered. 2) n. freedom. 3) adv. free, without restrictions.
frigi n. kite.
frikowtu 1) n. snot, nasal mucus. 2) n. cold, upper respiratory infection. 3) adj. have a cold.
abi frikowtu have a cold.
fringi v. toss, throw, fling.
fringi trowe throw away.
friyari 1) v. have a birthday. 2) n. birthday, celebration.
friyaridei n. birthday.
friyari-oso n. birthday party.
froisi v. move residence. FROM NL: verhuizen.
froiti 1) v. whistle. 2) n. whistle.
froktu n. fruit.
froktubon n. fruit tree.
fromu 1) adj. difficult, complicated, confusing. 2) v. tangle.
frow 1) n. woman, Mrs. 2) n. wife.
frudu 1) adj. high tide. 2) v. coming of high tide. 3) n. flood.
fruduwatra n. high tide.
fruk'fruku adv. very early.
fruku1 adv. early. FROM NL: vroeg.
frustan v. understand (variant of ferstan).
frusteri v. congratulate (variant of fersteri).
frustu 1) n. rust. 2) adj. rusty. 3) v. rust.
fruteri v. tell (variant of ferteri).
frutrow v. trust (variant of fertrow).
fu 1) prep. of. 2) prep. from. 3) conj. to, in order to. 4) prep. about. 5) prep. for.
fu di conj. because. SYN: bikasi; na di.
fu sanede adv. why.
fu tru adv. truly.
fufuru v. steal.
fufurubakru n. thieving spirit, kleptomaniac.
fufuruman n. thief.
fuga v. be irritated or bothered by, can't stand.
funamku 1) adv. primarily, especially. 2) adj. important. SYN: prenspari.
fundamenti n. foundation. SYN: stonfutu.
furu 1) adv. often, a lot. 2) quan. much, many. 3) adj. full. 4) vt. fill. 5) vi. become full.
furu leisi many times, often.
futu 1) n. foot, hoof, paw. 2) n. leg.
bro futu sit to rest.
de na en futu menstruate.
kaka futu oppose, resist.
kisi futu disappear (walk off).
meki futu dance.
misi futu stumble.
futubangi n. footstool.
futuboi n. errand boy.
futufinga n. toe.
futuketi n. anklet, ankle chain.
futuman nyanyan n. food prepared by menstruating woman.
futumarki n. footprint.
futupasi n. footpath.
futusei n. foot/base of something.
fyofyo1 n. stink bug, shield bug.
fyofyo2 n. magical sickness associated with family discord.

gado n. god, deity.
ala gado dei every single day (emphatic).
Masra Gado God, the Lord God.
Gadobuku n. Bible. SYN: Gadowortu.
gadofowru n. house wren.
Gadokondre n. heaven. SYN: heimel.
gadosneki n. boa constrictor.
Gadowortu n. Bible, Holy Scriptures.
gagu v. stutter, stammer.
gari1 1) adj. finished cooking, ready, done. 2) v. cook until done. FROM NL: gaar.
gari2 1) n. jaundice. 2) n. bile.
kari gari prepare oneself for confrontation.
gaw adv. quickly. SYN: es'esi.
gawgaw adv. very quickly.
Gayana n. Guyana.
Gayanaman n. Guyanese person.
gebore v. be born.
geri adj. yellow.
geri kopro n. brass, bronze.
gerikorsu n. yellow fever.
gersi 1) v. resemble, seem. 2) v. fantasize, brag.
gesontu adv. healthy, well. FROM NL: gezond.
gi1 1) v. give. 2) v. produce.
gi2 prep. for, to, on behalf of (benefactive).
gi abra hand over, surrender.
gi bere impregnate.
gi dyaranti guarantee.
gi faya give off light.
gi frantwortu account for.
gi grani praise, honor.
gi keti wind up (clock).
gi mankeri injure.
gi odi greet, say hello.
gi pardon forgive.
gi pasi give permission.
gi prisiri please, give pleasure.
gi rai advise.
gi tori tell stories / put someone in their place.
gi wan anu lend a hand.
gi yesi answer.
gitara n. guitar.
go v. go.
go baka return, go back.
go doro continue, go on.
go na baka regress, decline.
go na doro go out.
go na fesi improve, progress.
go na strati go out.
go na waka take a trip.
go sribi go to bed.
go teki pick up, fetch.
godo1 n. wasp nest, beehive.
godo2 n. hollowed out calabash.
gogo n. buttocks. SYN: bakasei.
golu n. guilder (currency). FROM NL: gulden.
goma 1) n. starch, starch water. 2) v. starch.
gomakuku n. cassava starch cookies.
gon n. firearm, rifle, pistol, gun.
gonini n. harpy eagle.
gorogoro n. throat, gullet.
gosontu adv. healthy, well (variant of gesontu).
gotro n. gutter, drainage ditch.
gowt'man n. gold digger, gold miner.
gowtu 1) n. gold. 2) adj. golden.
wroko gowtu mine gold.
grabu 1) v. grab, grasp, grip. 2) v. understand. SYN: ferstan.
gran1 n. gram.
gran-2 prefix. greatest or most important (granman, grankrutu).
granmama n. grandmother.
granman 1) n. tribal leader of Maroons. 2) n. governor.
granman-oso n. presidential palace / governor's mansion.
grantangi n. many thanks, thank you very much.
granwe adv. for a long time already.
grasi1 1) n. glass, shards of glass. 2) n. drinking glass.
grasi2 n. grass.
grat'fisi n. catfish (fish without scales).
grati 1) adj. smooth, level. 2) v. slip. 3) v. smooth with hands. 4) v. iron clothes.
grati fadon slip and fall.
grebi n. grave.
grebimofo n. mouth of the grave.
gridi 1) adj. greedy. 2) adj. stingy, miserly. 3) adj. gobbling food down.
gridifasi n. greed, stinginess.
gridiman n. greedy person, miser.
grikibi n. great kiskadee bird.
griti 1) v. grate. 2) v. scrape, scour, scrub.
gro v. grow, grow up.
gro skin shudder, get goose bumps.
grofu 1) adj. impolite, ill-mannered. 2) adj. rough, coarse. 3) adj. big.
gron 1) n. ground, field. 2) n. floor. 3) n. downstairs. 4) n. cause/background of something.
gronmama n. earth goddess.
gronman n. farmer. SYN: buru.
gron-nyanyan n. ground provisions (plantains, tubers).
grontapu 1) n. world, earth. 2) adv. extremely, very.
groskin n. goose bumps, creeps.
gruma v. scrub using a washboard.
grun adj. green.
gruntu n. vegetables (green leafy ones). FROM NL: groente.
gudu 1) n. treasure, riches, wealth, property. 2) adj. rich, wealthy.
mi gudu term of endearment: my dear, my darling.
guduman n. rich person.
guyaba n. guava fruit.
gwasi n. leprosy.
gwasiman n. leper.
gwe 1) v. leave, go away. 2) adj. gone. 3) v. pass away (death).
gwenti 1) n. custom, tradition, habit. 2) v. become accustomed to.
lasi gwenti out of the habit, not used to.

haira adj. shrewd, crafty.
haira tapu v. having strong desire to get something.
hari1 1) v. pull, tug, jerk. 2) v. extend, enlarge. 3) v. leave. 4) v. run off (water). 5) v. draw a line/breath.
hari baka lay down to rest.
hari bro breathe deeply.
hari gwe run off, go away.
hari kon langa extend, stretch out.
hari lesi stretch one's body.
hari neki titei yell at someone.
hari skin massage / spank.
hari skowru shrug shoulders.
hari taki backtalk, argue.
hari wan mofo take a drink.
hari2 1) adj. slim, skinny, slender. 2) v. slim down, lose weight.
hariman n. person quick to draw a knife.
haswa 1) v. hurry. 2) v. work hard at, toil.
hati1 1) v. become hot. 2) v. heat up.
hati2 1) v. hurt, be painful. 2) v. sorry, hurt. 3) v. regret.
hat' sani n. painful things.
hebi 1) adj. heavy. 2) adj. severe, harsh, unbearable. 3) n. burden. 4) v. make heavy.
hei1 1) adj. high, tall. 2) v. raise, lift up. 3) adj. important. 4) adj. haughty, proud. 5) adj. high on drugs.
go na hei rant and rave.
heihei 1) adj. high-ranking. 2) adj. high-sounding, pretentious.
heiman n. important person, VIP. SYN: bigiman.
heimel n. heaven. SYN: Gadokondre.
heimemre n. pride, haughtiness.
abi heimemre be proud, haughty.
heisi v. hoist, raise. SYN: opo3.
her'esi adv. in the near future, very soon, quickly.
her'heri1 adv. whole.
her'heri2 n. dish made from ground provisions/plantains and salt fish.
heri 1) adj. all, whole. 2) adv. really, very.
her'ipi adj. a whole lot, many.
hilahila adj. plenty, in abundance. SYN: furu; bogobogo.
Hindustani 1) n. Hindustani. 2) adj. Hindustani.
hipi n. pile, heap, stack.
hoigri 1) v. be a hypocrite. 2) v. gossip, speak about others.
hoigriman n. hypocrite.
hondro num. hundred.
howpu 1) n. hope. 2) v. hope.
huru 1) v. engage in prostitution / promiscuity. 2) n. prostitute, whore.
hurulibi n. promiscuous behavior.
huruman n. man with many sexual partners.

ibri adj. every, each. SYN: ala.
ibri leisi every time.
ibri sma each person.
ibriwan n. each and every one.
ifrow 1) n. miss, madam. 2) n. female teacher.
ijskasi n. refrigerator.
in' prep. in, within (ini).
in'bere n. entrails, internal organs, machine parts.
in'bere tori private family affair, secret.
ingi 1) n. Amerindian. 2) adj. Amerindian. 3) n. Indian spirit in Winti.
ingi kondre n. Amerindian settlement.
ingi poku n. Amerindian music.
ingi tongo n. Amerindian language.
ini 1) prep. in, within. 2) n. inside.
ini-anu n. palm of hand.
iniwan prn. any one, whichever.
iniwan sma whoever, anyone, each and every person.
iniwan ten whenever, at any time.
in'sei n. inside. ANT: dorosei.
ipi 1) n. pile, heap, stack. 2) v. stack up. 3) adj. many, a lot.
ipi-ipi adj. very many. SYN: bogobogo; hilahila.
isri1 1) n. iron, steel. 2) n. metal. 3) adj. iron, metal.
opo isri lift weights.
isri2 n. clothes iron.
isrifowru n. airplane (archaic). SYN: opolangi.
iti v. throw, fling.
iti trowe throw away.
iti wan ai tapu take a look at, keep an eye on.
iya 1) adv. yes (affirmative). 2) conj. yes, yeah.

kaba v, n, adv. end, stop, finished, already (kba).
kabesa n. used in tya kabesa (be very smart).
kabra n. ancestor spirit baptized in Christian church (Winti).
kadasneki n. emerald tree boa.
kado 1) n. gift. 2) adv. as a gift.
kafti 1) n. book cover. 2) v. cover a book.
kailan n. Chinese kale, bitter greens.
kaiman n. cayman, alligator.
kaka1 n. excrement, manure.
kaka2 1) v. cock a gun. 2) adj. cocked.
kaka futu oppose, resist.
kaka yesi listen carefully.
kakafowru n. rooster, cock.
kakalaka n. cockroach.
kaka-oso n. outhouse, toilet.
kakumbe n. jaw, chin.
kamisa n. loincloth worn by Maroon men.
kampu 1) n. temporary shelter, encampment. 2) n. traditional Bush Negro / Amerindian house.
kamra n. room.
kamra-oso n. single-room dwelling in barracks.
kan1 1) aux.v. can, able to. 2) v. be possible.
kan2 n. cup, mug.
kan3 1) v. comb hair. 2) n. comb (kankan1).
kanari1 n. violaceous euphonia songbird.
kanari2 n. canal, channel.
kande adv. maybe, perhaps. SYN: luku bun.
kandra n. candle.
kankantri n. silk cotton tree, ceiba.
kanti 1) n. side, edge. 2) v. list, capsize, tilt. 3) v. lose balance. 4) v. pour liquid.
kantoro n. office.
kanu n. cannon.
kapasi n. armadillo.
kapelka n. butterfly.
kapten n. captain, leader, village chief.
kapu 1) v. chop, cut. 2) n. open cut, gaping wound.
kapu trowe chop down. SYN: fala1.
kapuwa n. capybara, water pig. SYN: watra-agu.
kapweri n. overgrown area with tall grass/bushes.
kar'barba n. corn silk.
karet n. hawksbill sea turtle.
kari 1) v. call. 2) v. name. 3) n. invitation, summons.
bari kari shout for someone.
kari kon call over, invite.
seni kari summon.
kar'tiki 1) n. corncob. 2) v. scrub clothes with corncob.
karton n. cardboard.
karu n. corn, maize.
mi wan ai karu apple of my eye, beloved.
kasaba n. cassava, yuca, manioc.
kasababrede n. cassava bread.
kasabawatra n. liquid squeezed from bitter cassava.
kaseko n. Surinamese music and dance style.
kaseri adj. ritually clean.
kasi1 n. cheese.
kasi2 n. cupboard, wardrobe, closet.
kasmoni n. rotating savings club (tontine).
kasripo n. dark cassava syrup used in cooking.
katibo n. slavery. SYN: srafuten.
katun n. cotton.
katunbon n. cotton tree.
kaw1 n. cow. Bos taurus.
kaw2 v. chew.
kaw tifi 1) gnash teeth. 2) put someone in their place.
kawina n. traditional music and dance style. VARIANT: kawna.
kba 1) v. end, stop, cease. 2) v. be out of, finished. 3) n. end, stop. 4) adv. finished, already. 5) adj. completed.
ke interj. expression of sympathy (tye).
kebroiki v. use. FROM NL: gebruiken.
kefalek 1) adj. dangerous. 2) adj. great, exceptional. 3) adv. exceedingly.
keksi n. cake. SYN: eksikuku.
kenki 1) v. change, modify. 2) v. exchange. 3) v. exchange money. SYN: broko2. 4) n. change.
keksi n. cake.
kerki 1) n. church. 2) n. church service.
ori kerki hold a religious service.
kerkibangi n. church pew.
kersi n. cherry (Barbados or Suriname cherry).
keskesi n. general term for small monkeys.
keti 1) n. chain, necklace. 2) v. secure with chain.
gi keti wind up a clock.
ketikoti n. Emancipation Day (July 1st). SYN: manspasi.
kfalek adj. dangerous, exceptional (kefalek).
kibri 1) v. hide. 2) v. save, store up. 3) v. protect, keep safe. 4) adj. hidden, secret.
kibrifasi adv. secretly, stealthily.
kibripe n. hiding place, sanctuary.
kibritori n. secret.
kilo n. kilogram.
kindi 1) n. knee. 2) v. kneel.
broko kindi bow slightly by bending knees.
kino 1) n. movie theater, cinema. 2) n. movie, motion picture.
kiri 1) v. kill, murder. 2) v. turn off (light/appliance). 3) v. extinguish (fire). 4) v. end a situation. 5) adv. dead.
kiri hori stop something from proceeding.
kiriman n. murderer, killer.
kisi1 1) n. crate, box. 2) n. airplane.
kisi2 1) v. get, receive. 2) v. catch, seize. 3) v. outsmart, get better of someone.
kisi ensrefi come to one's senses, regain alertness.
kisi bere become pregnant.
kisi pikin give birth, have a baby.
klambu n. mosquito net.
klapu 1) v. slap. 2) n. slap. 3) v. hit, beat.
klapu ini den anu clap hands.
klari 1) adj. finished, gone, sold out. 2) adj. done, cooked. 3) v. finish, complete.
klar'klari adv. ready, prepared.
kleidoti n. clay.
kleriman n. tailor, seamstress. SYN: sneiri.
klompu n. simple wooden-sole sandal. SYN: teptep.
kloru1 n. color.
knapu v. stand (tnapu).
knekti n. servant, worker. FROM NL: knecht.
knepo n. button; knot; v. button, knot.
koba n. basin, bowl.
kodo adv. single, only one. SYN: enkri.
Kodyo n. ritual name for a man born on Monday.
Kofi n. ritual name for a man born on Friday.
kofi n. coffee.
kofibon n. coffee tree/shrub.
kofru n. suitcase, trunk. FROM NL: koffer.
kofu n. fist.
kofu fadon come to blows, fight.
meki wan kofu unite (make a fist).
naki wan kofu punch, slug.
koiri 1) v. stroll, walk around. 2) v. go out. 3) v. travel.
teki wan koiri take a walk.
koko1 1) n. seed, pit, kernel. 2) n. testicles. 3) n. head, wits.
koko2 1) n. lump, bump, swelling. 2) n. knuckle. 3) v. rap with knuckles.
kokobe 1) n. fingers/toes deformed by leprosy. 2) adj. deformed by leprosy.
kokro n. culvert.
kronto n. coconut.
koleisi n. club, clubhouse, gambling den.
koloku 1) n. good fortune, luck. 2) adj. fortunate, lucky.
komandanti n. commander.
komedi n. prank, joke.
komedi prei n. stage play.
komki 1) n. bowl. 2) n. joint (knee/elbow).
komkomro n. cucumber.
komopo 1) v. come from, get out. 2) v. leave. 3) prep. from, beginning.
kompe n. friend. SYN: mati.
kon 1) v. come, arrive. 2) v. become, happen.
broko kon come unexpectedly.
kon baka return.
kon go accompany, come along.
kon bun baka reconcile.
kon ferstan realize.
kon makandra meet, hold a meeting.
kon na krin be revealed, brought to light.
kon na leti reveal, come out in open.
kon na wan come together.
konbaka n. return.
kondre 1) n. nation, country, region. 2) n. village in interior.
dorosei kondre foreign country.
kondreman n. countryman.
koni 1) adj. smart, sharp, wise, clever. 2) n. trick, wisdom, knowledge.
koniman n. smart person, wise man.
konkoni 1) n. agouti. 2) n. rabbit.
konkru 1) v. tell on someone, betray trust. 2) v. gossip, slander. 3) v. whisper.
konkruman n. gossip, traitor.
konkrutitei n. telephone.
naki wan konkrutitei call on phone. SYN: bèl.
konmakandra n. meeting, gathering. SYN: krutu.
konofroku n. garlic. FROM NL: knoflook.
konsensi n. conscience.
konsensi fonfon guilty conscience.
kontren n. area, region, neighborhood.
kopi1 n. teacup, small cup.
kopro 1) n. copper, brass. 2) adj. copper.
koprosensi n. cent, copper penny.
koranti n. newspaper.
kori v. fool, trick, deceive. SYN: kisi2.
koro1 n. cabbage.
korpatu n. charcoal stove, barbecue.
Korsow n. Curaçao.
korsu n. fever.
kosi1 1) v. scold, chew out, curse. 2) n. curtsy, bow.
kos'kosi 1) n. bickering. 2) v. fuss, complain.
koso v. cough.
koti1 1) v. cut (knife/scissors/saw). 2) v. break (rope/wire). 3) v. operate on. 4) v. harvest crops. 5) v. cut off, turn off (electricity/water). 6) v. deduct money. 7) adj. cut, broken. 8) v. curdle, sour (milk).
bere koti sudden urge to use toilet.
koti2 1) v. have trouble with someone. 2) v. get along with someone.
koti3 v. be dressed up. SYN: prodo.
koti a dron play drum well.
koti abra cross over, traverse.
koti faya spark, give off sparks.
koti odo use a proverb.
koti pasi take a shortcut.
koti puru cut off, amputate.
koti strafu serve time in prison.
koti wan tori put an end to a story/situation.
koto 1) n. skirt. 2) n. traditional Creole dress.
kotoigi 1) n. witness. 2) v. testify.
kotomisi n. woman wearing traditional Creole costume.
kownu n. king.
kownukondre n. kingdom.
kownu-oso n. palace.
kowru 1) adj. cold. 2) n. cold, chill. 3) v. cool down.
kowru ati calm down.
kowrudresi n. laxative.
kowrupe n. shade, cool place.
kowruten n. cold season, winter.
kowsbanti n. yardlong bean.
kra n. soul, person's spirit.
krabasi n. calabash.
krabita n. goat.
krabu1 1) v. scratch, scrape. 2) n. scratch.
krabu2 n. crab.
kragi 1) v. complain, accuse. 2) n. complaint.
kraka v. support someone/something with a prop.
krakatiki n. forked stick prop.
krakti 1) n. strength, power. 2) adj. powerful, convincing, nutritious.
krape n. sea turtle, green sea turtle.
krara n. bead.
krarasneki n. coral snake.
kras'dagu n. fierce dog, wild dog.
kras'ede n. concern, worry. SYN: brok'ede.
krasi1 1) v. scratch. 2) v. itch.
ede krasi intelligent, smart.
krasi2 1) adj. wild, fierce, aggressive. 2) adj. hot, fiery. 3) adj. turbulent. 4) adj. horny.
kraskrasi n. rash, itch, eczema.
krawasi 1) v. whip, beat. 2) n. whip.
krawerki n. side job, part-time job. SYN: bakafinga1.
krei 1) v. cry, weep. 2) n. crying, weeping.
bari krei burst into tears.
kreiti n. chalk.
kren v. climb.
Kresneti n. Christmas, Christmas Eve. SYN: Bedaki.
kriboi adj. last, final. SYN: laste.
kriboiwan n. the last one. SYN: lastewan.
kriki n. creek, stream.
krin 1) adj. clean, neat, pure. 2) v. clean, polish. 3) adj. clear. 4) adv. clearly, plainly.
kon na krin be revealed, brought to light.
tyari kon na krin bring to light, reveal.
krinkrin adv. completely, entirely.
krioro 1) n. Creole. 2) adj. Creole. 3) n. infant.
kriorosma n. person of African descent, Creole.
krofaya n. charcoal.
kroiki1 1) v. crumple, wrinkle. 2) adj. creased.
kroipi v. crawl, creep.
kroisi 1) n. cross. 2) v. crucify, falsely accuse.
kroiwagi n. wheelbarrow.
kron 1) adj. crooked, bent. 2) v. make crooked, bend.
kronkron adj. twisted, winding.
kronto n. coconut.
kronto-aleisi n. rice cooked in coconut milk.
krontobon n. coconut palm tree.
krosbei 1) adv. close by, near. 2) adj. close, closely related.
krosi 1) n. clothes. 2) n. cloth, piece of cloth.
dot'krosi n. dirty laundry.
was'krosi n. clean laundry.
kros'kasi n. wardrobe, closet.
kruderi1 1) v. deliberate, work out an agreement. 2) v. match, go together.
krukt'anu n. left hand. ANT: let'anu.
kruktu adj. wrong, bad, crooked. ANT: bun.
kruktudu n. evil deeds.
kruktufasi n. unrighteousness, evil ways.
kruktuman n. devil, evil person. SYN: didibri.
krut'krutu 1) v. bicker, squabble, complain. 2) n. squabble.
krutu 1) v. try in court, judge. 2) n. court of law, trial. 3) v. quarrel, argue, complain. 4) n. tribal meeting.
krutubakra n. judge.
krutubasi n. judge.
krutuman n. judge; quarrelsome person.
krutu-oso n. courthouse.
kruwa 1) adj. not well-cooked, half-cooked. 2) v. cook improperly. 3) adj. not fully ripe.
kruyara n. dugout canoe.
kugru n. bullet, bearing. SYN: lai2.
kukru n. kitchen. SYN: botri.
kuku1 1) n. cake. 2) n. cookie.
kuku2 v. boil.
kuli n. Hindustani person (sometimes derogatory).
kuliman n. Hindustani man. SYN: babun2.
kulturu 1) n. culture. 2) adj. cultural.
kumakoisi n. outhouse, toilet. SYN: kaka-oso.
kumba n. navel.
kumbatitei n. umbilical cord.
kumbu n. bacaba palm tree / juice.
kundu1 n. lump, bump, swelling. SYN: koko2.
kundu2 adj. short (slang). SYN: syatu.
kundu3 1) adj. stingy, selfish. 2) v. be stingy.
kuneti interj. good evening, good night.
kunofroku n. garlic (konofroku).
kunsu n. cushion, pillow.
kusontu adj. healthy, well (gesontu).
kusuwe n. annatto tree / dye.
Kwaku n. ritual name for a man born on Wednesday.
kwakwa n. duck that doesn't need water to swim.
Kwami n. ritual name for a man born on Saturday.
Kwamina n. ritual name for a man born on Tuesday.
kwartyi n. twenty-five cents (quarter). SYN: tyawa.
Kwasi n. ritual name for a man born on Sunday.
Kwasiba n. ritual name for a woman born on Sunday.
kwasibita n. bitterwood, quassia wood.
kwaskwasi n. coati animal.
kwata n. black spider monkey.
kwek n. mercury.
abi kwek ini en skin be restless, rambunctious.
kweki v. raise children/animals, grow plants.
kwekimama n. foster mother.
kwekipapa n. foster father.
kwet'kweti adv. absolutely not, not at all. SYN: srefsrefi.
kwikwi n. armored catfish.
kwinsi 1) v. push, crowd. 2) v. squeeze, press. 3) v. wring out.

la n. drawer.
labaria n. fer-de-lance snake. SYN: owrukuku1; rasper.
lafu 1) v. laugh. 2) v. ridicule, laugh at. 3) n. laughter, something funny. 4) v. smile.
bari lafu burst out laughing.
gi lafu make someone laugh.
lafufesi n. smile.
lafutori n. funny story, joke.
lagi 1) adj. low. 2) adj. little, low, small amount. 3) adj. cowardly, mean.
lagiman 1) n. person of low position. 2) n. coward.
lai1 1) v. load, fill up. 2) v. be full of, abound. 3) n. load, cargo, stuff.
lai a bal score a goal/basket.
lai2 n. cartridge, bullet. SYN: kugru; patron.
lala 1) adj. raw, uncooked. 2) n. raw smell. 3) adj. full-blooded, purebred.
lampu n. lamp, light bulb.
langa1 1) adj. long, tall. 2) adv. a long time.
hari kon langa extend, stretch out.
o langa how long.
langa2 1) v. hand or pass something. 2) v. reach out, extend.
langa bere have an insatiable appetite.
langabere adj. long-winded, long duration.
langalanga1 1) adv. straight ahead. 2) adv. directly, right away. 3) adv. right, exactly.
langalanga2 adv. without reason, without thinking.
langaman n. tall person.
langaten adv. for a long time.
lanki n. edge, brim, border. SYN: kanti; seisei.
lanpresi n. harbor, airstrip, landing.
lanti 1) n. government, civil authority. 2) adj. government-owned.
lantibakra n. civil servant.
lantiman n. government employee, civil servant.
lantimoni n. tax. SYN: edemoni.
lantistrati n. public road.
lantiwroko n. government job.
lapu 1) v. patch, patch up. 2) n. patch.
lasi 1) v. lose, miss. 2) v. lose a game/contest. 3) v. be lost. 4) adj. lost.
tyari go lasi waste, squander.
lasi ati lose heart, become discouraged. SYN: lasi howpu.
lasi bere miscarry. SYN: trowe bere.
lasi gwenti lose the habit of, get out of habit.
lasi pasi lose one's way, get lost.
lasiman n. loser. ANT: winiman.
laste adj. last, final. SYN: kriboi. ANT: fosi.
lastewan n. the last one. SYN: kriboiwan.
lati1 adv. late. ANT: fruku1.
lati kba too late, late already.
o lati what time (is it?).
lati2 1) n. ruler. 2) n. lath, narrow piece of wood.
lat'lati adv. very late.
law adj. crazy, insane. SYN: kepi.
lawlaw 1) adj. foolish, senseless, silly. 2) adj. small, simple, trivial, unimportant.
lawman n. insane person, crazy person, fool.
lawman-oso n. psychiatric hospital. SYN: kolera.
leba n. tall spirit dressed in rags (Winti).
lebriki n. rib, rib cage. SYN: krabnari.
lefre n. liver.
legre n. army.
legwana n. iguana.
lei 1) v. tell a lie, deceive. 2) n. lie. ANT: tru.
leigi 1) adj. empty. 2) v. empty out, clean out.
leigileigi adj. completely empty.
leiman n. liar. SYN: leimofoman.
leisi1 v. read.
leisi2 n. repetition, time(s). SYN: tron2.
ala leisi every time.
ete wan leisi again.
furu leisi many times, often.
son leisi sometimes.
tra leisi next time.
wan leisi sometime, once.
leisi boskopu reprimand.
leisi strafu pronounce sentence on someone.
leisibuku n. reading book.
leitori n. lie, fabricated story. SYN: anansitori.
leki1 1) v. leak. 2) n. leak.
leki2 v. lick, lick up.
leki3 1) conj. like, as, as if. 2) conj. but.
te leki until, up to.
lekti1 1) adj. light, bright. 2) v. light up, illuminate. 3) adj. light (color).
lekti2 1) adj. light (weight). 2) v. lighten, make easy. 3) adj. light, easy. 4) adj. weak constitution. 5) adj. light-headed.
lekti en ede relax, rest brain.
lekti-ede adj. credulous, gullible.
lemki n. lime fruit. Citrus aurantifolia.
leni 1) v. lend, loan. 2) v. borrow.
lep' bana ripe plantain.
lepi 1) adj. ripe. 2) v. ripen. 3) adj. smart, clever for one's age.
leri1 1) v. teach. 2) v. learn. SYN: stuka. 3) n. lesson, instruction, education. 4) n. teaching.
leribuba 1) n. belt. 2) v. whip with a belt.
leriman n. teacher, learned person.
lesi 1) adj. lazy. 2) n. laziness.
hari lesi stretch one's body.
lesiman n. lazy person, lazybones.
lespeki 1) n. respect. 2) v. respect, hold in esteem. VARIANT: respeki.
let' adv. in very close proximity to (let' na mi fesi = right in front of me).
let'anu n. right hand. ANT: krukt'anu.
let'anu sei right-hand side.
leti1 1) n. light. 2) v. light, turn on.
kon na leti be revealed, brought to light.
leti2 n. right, legal entitlement.
leti3 adj. right, correct. SYN: yoisti.
abi leti be right.
taki leti tell the truth.
let'opu adv. erect, straight up.
letyan n. Guianan tree squirrel.
liba n. river.
libakanti n. riverbank, riverside. SYN: libasei; watrasei.
libamofo n. mouth of a river.
libasei n. riverbank.
libi1 1) v. live, be alive. 2) n. life. 3) v. live, reside. SYN: tan1.
prati libi divorce.
seti libi live together with someone.
libi2 1) v. leave, abandon. 2) v. leave, go away. 3) v. remain, be left over.
libi na baka leave behind.
libilibi 1) adj. alive, living. 2) adv. in person, in the flesh.
libimarki n. age (e.g. doro a libimarki fu 80 yari).
libisani n. living creature.
libisma n. person, human being. SYN: sma.
libiten n. lifetime.
libiwan n. the living (as opposed to dead).
ligiligi v. baste, tack, sew quickly with few stitches.
likanu n. pygmy anteater.
lila n. purple, lilac color.
lin 1) n. line. 2) n. fishing line.
linga n. finger ring.
lo1 v. to row a boat.
lo2 n. tribe, clan.
lo3 n. line, queue.
lo4 adj. a lot, much (wan lo).
lobi1 1) n. love. 2) v. love, fall in love. 3) v. like, appreciate. 4) v. like to do, be in habit of.
lobi2 v. rub, smear. SYN: wrifi; poti.
lobiwan n. loved one, beloved.
logologo n. eel, electric eel.
loisi n. clock, watch (oloisi).
loko n. train (railway).
loktu 1) n. air, sky. 2) n. upstairs, up.
go na loktu rant and rave.
loli 1) n. slime. 2) adj. slimy. 3) adj. slow.
lolo 1) v. roll, roll up. 2) n. cassette tape. 3) n. paint roller.
lolo wan boskopu pass on a message.
lomboto v. surround, encircle, gang up on.
Lomsu 1) n. Roman Catholic. 2) adj. Roman Catholic.
Lomsukerki n. Roman Catholic church.
lon 1) v. run. 2) v. flow (water/nose). 3) v. race, go fast.
lon abra overflow.
lonbaisigri n. 10-speed bicycle.
lont'ai n. allspice.
lontu 1) adj. round. 2) prep. around. 3) adv. around, all over. 4) v. surround.
lontu fon gang up on.
losi 1) v. roast over fire, barbecue. 2) v. bake or roast in oven.
loso 1) n. head/body louse. 2) n. parasitic insect.
lostu v. desire, want, fancy something.
loto1 1) n. lead metal. 2) n. plumb line.
loto2 n. five-cent piece, nickel.
lowe 1) v. escape, run away, desert. 2) adj. runaway, escaped.
lowe nengre Maroon, runaway slave.
loweman n. deserter, fugitive.
luku 1) v. look at, watch. 2) v. visit. SYN: fisiti. 3) v. watch, take care of.
koti wan luku spiritual diagnosis by shaman.
luku bun be careful; maybe, perhaps.
Luku dya! interj. here you are.
lukuman n. seer, spirit practitioner.
lun n. cream skimmed off milk.
luru v. spy on, lie in wait for, watch for. FROM NL: loeren.
lus'bere n. diarrhea. SYN: brokobere; wrokobere.
lusu 1) adj. loose. 2) v. untie, loosen, unfasten. 3) v. release, set free. 4) v. depart, leave (boat/bus). 5) v. take apart.
lusu a bal shoot/kick ball hard.
lusumbe n. centipede.

m' 1) prn. mi. 2) aux.v. musu1.
Ma1 title. mother (form of address for older women).
ma2 1) conj. but, however. 2) conj. introduces new info. FROM NL: maar.
mahonibon n. mahogany tree.
mai1 1) v. mow grass. 2) v. cut grain, reap.
mai2 n. older Hindustani woman.
maka 1) n. thorn. 2) n. stinger, spine.
maka-alata n. spiny rat.
makamaka 1) n. thorn bush. 2) adj. thorny.
makandra 1) adv. together, jointly. 2) prn. each other. 3) v. associate with.
kon makandra meet, hold a meeting.
makasneki n. bushmaster snake. SYN: kapasisneki.
makriki adj. easy. ANT: tranga; hebi.
makti n. power, authority.
malata n. mulatto person.
malengri 1) adj. crippled, handicapped. 2) v. cripple, maim.
malengrisma n. handicapped person.
mama1 n. mother.
mama2 adj. a great deal, exceptional amount (mama moni = huge sum of money).
mamabere n. womb (same mother: mi nanga mi sisa de fu wan mamabere).
mamafoto n. capital city.
mamanten n. morning (daybreak to noon).
man1 1) n. man. 2) n. husband.
man2 aux.v. able to, can (capability/control). Tide mi no man meki a bangi.
man3 interj. expression of frustration (Man! Mi ben mu wakti!).
-man suffix. compound suffix for person who does something (fufuruman, gronman, guduman).
manari n. square woven sieve for food prep.
man-ati n. courage. SYN: dek'ati.
mandi v. be mad, become mad or upset.
mangri 1) adj. thin, skinny, scrawny. 2) adj. infertile soil.
maniri 1) n. manner. 2) n. manners.
mankeri 1) n. accident, harm, injury, wound. 2) v. lack, be missing.
gi mankeri injure.
manki n. basket with lid/handles. SYN: baskita.
man-nengre n. man. SYN: mansma.
manpikin 1) n. boy. 2) n. son. CPART: umapikin.
mansma 1) n. man, male person. 2) adj. male.
manspasi n. Emancipation Day (July 1st). SYN: ketikoti.
manya n. mango fruit.
mara v. grind grain in a grinder.
maraka n. rattle, maraca. SYN: sek'seki.
maripa n. maripa palm tree & fruit.
marki 1) n. mark, sign. 2) n. impression. 3) n. goal, finish line. 4) v. mark. 5) v. measure. 6) v. aim.
psa marki extraordinarily, exceedingly.
markitiki n. ruler, measuring stick. SYN: doitiki; lati2.
masi 1) v. crush, knead, mash, squeeze. 2) adj. bruised fruit. 3) v. hurt, bruise.
masi ati fill with remorse.
masi fesi put on glum face; gloomy weather.
maskita n. mosquito.
maskitakandra n. mosquito coil.
masra 1) n. husband, man. 2) n. master. 3) title. mister, sir. 4) n. Lord (Masra Gado).
masyin n. engine, machine, motor.
mata1 n. large wooden mortar.
matamata n. doormat. SYN: figifutu.
matapi n. woven cassava press.
mati 1) n. friend. SYN: kompe. 2) v. lesbian relationship.
matifasi n. friendship.
matrasi n. mattress.
mayoro n. major (military rank).
meki 1) v. make, cause to happen. 2) v. repair, fix. 3) v. allow, let.
dat' meki therefore, that is why.
fu sanede meki why (rhetorical).
san meki why.
meki baka repair, fix.
meki bigi boast, brag.
meki futu dance.
meki lafu pretend to laugh.
meki modo show off.
meki mofo make an agreement.
meki muiti try hard, put out effort.
meki pikin give birth, have baby.
meki prisiri celebrate, have fun.
meki trobi get into a fight, quarrel.
meki wan kofu unite (make a fist).
memre1 1) v. remember. 2) v. remind.
memre2 n. member of a church/club.
merki 1) n. milk. 2) v. milk a cow.
mesre 1) v. build with brick/concrete block. 2) v. plaster, cement. 3) adj. masonry.
mesre tapu fill hole with cement.
mesreman n. mason, bricklayer.
meti 1) n. animal, beast. 2) n. meat. 3) n. flesh.
mi prn. 1st person singular (I, me, my, mine).
mindri 1) n. middle, midst. 2) prep. between.
mindribaka n. back, middle of back.
mindribere n. midriff, middle of belly.
mindrifinga n. middle finger.
mindrineti n. midnight (12:00 AM).
mira n. ant.
mirafroiti n. lesser anteater.
miri n. mill, grinder.
misi1 1) v. miss (target/person). 2) n. missed shot.
misi2 n. woman, girl, ma'am.
misi futu stumble.
misi mofo slip of the tongue.
misrefi refl.prn. myself.
miti1 1) v. meet. 2) v. happen to, befall. 3) v. touch, bring together.
miti baka meet again.
miti kon na wan connect, join together.
m'ma n. mother (variant of mama).
modo 1) n. fashion, style. 2) adj. fashionable, stylish.
meki modo show off.
modoman n. dandy, stylish person.
mofina adj. miserably poor. SYN: pôti; pina1.
mofinawan n. poor or needy person.
mofo 1) n. mouth. 2) n. bite, swig. 3) n. statement, word. 4) n. beak, snout. 5) n. opening. 6) n. point of stick. 7) n. area right in front of something.
firi wan sma mofo try to find out what someone knows.
fon nanga mofo browbeat into silence.
hari wan mofo take a drink.
koti wan sma mofo interrupt someone.
langa en mofo pucker up lips.
meki mofo make an agreement.
misi mofo slip of tongue.
moro mofo unbearable.
naki mofo hit one's mouth (superstitious gesture).
nyan wan sma nanga mofo talk circles around someone.
psa mofo disobey.
puru mofo take back what was said.
seki mofo speak.
suku mofo be offensive / provoke.
tapu wan sma mofo shut someone up.
wasi mofo brush teeth.
mofobuba n. lips.
mofodoro n. space in front of door, front yard.
mofokoranti n. rumor, grapevine news.
mofoneti n. early evening (6:00 to 7:30 PM).
moi 1) adj. pretty, handsome, nice, beautiful. 2) v. decorate.
moimoi v. decorate, make pretty.
moismoisi n. mouse.
moksi 1) v. mix, blend. 2) adj. mixed, co-ed.
moksi kon na wan meet, come together.
moksi meti adj. dish with mixed meats.
moksi-aleisi n. rice dish cooked in one pot with meats/vegetables/coconut milk.
moksipatu 1) n. different vegetables/meats cooked together. 2) n. smorgasbord.
moni 1) n. money. 2) n. salary, wages.
monibon n. money tree, endless supply.
moniman n. rich person who likes to spend.
monisaka n. purse, moneybag.
monki1 n. generic name for monkeys.
montyi n. slice or section of fruit/fish.
mope n. yellow mombin, hog plum.
morgu interj. good morning.
moro 1) quan. more. 2) adv. anymore. 3) comp. -er or more. 4) v. overpower.
moro nanga moro more and more.
moro mofo unbearable.
morsu 1) v. make dirty, mess up. 2) adj. messy, dirty.
motyo 1) n. prostitute, whore. 2) v. live promiscuously. 3) adj. promiscuous.
motyolibi n. promiscuous behavior.
mu aux.v. must, should (short for musu1).
muiti 1) n. effort. 2) n. objection.
meki muiti try hard, put out effort.
mumui adj. inquisitive, curious. SYN: bemui.
mun 1) n. month. 2) n. moon.
munde n. Monday.
munduku n. sanitary napkin.
munkenki 1) n. full moon. 2) n. moonlight.
munsiki n. menstruation, menstrual period.
muru1 n. nut for a bolt.
muru2 n. uterus, womb. SYN: bere1.
mus aux.v. must, should (musu1).
musudei n. early morning before daybreak (3:00 to 5:00 AM).
musu1 aux.v. must, should, be obliged to.
musu2 n. bonnet, knitted cap.

na1 v. to be (present tense stative: A man disi na skowtu).
na2 1) prep. locative preposition (at, in, to, on). 2) prep. by (instrumental). 3) art. emphasis marker (Na yu fufuru mi moni!).
na di conj. because. SYN: fu di; bikasi.
na doro outside.
na fesi previously; in advance.
na fu belong to; hail from.
nafu neg + aux.v. don't have to (contraction of no abi fu).
nafun interj. good evening. SYN: kuneti.
nai v. sew clothes.
naki 1) v. hit, beat, strike. 2) v. knock on door. 3) v. collide, crash.
fu naki dagu in abundance.
naki wan ... hit with an instrument.
naki dron play drum.
naki dyap do odd jobs.
naki kofu fight with fists.
naki mofo hit one's mouth (superstitious).
naki papira fill out form / make report.
naki poku play music.
naki spoiti give an injection.
naki tapu slam shut.
naki wan blaka make a blunder.
naki wan kofu punch, slug.
naki wan konkrutitei call on phone.
nak'naki v. hit or bang repeatedly.
namku adv. primarily, especially (funamku).
nanai n. needle.
nanai-olo n. eye of a needle.
nanasi n. pineapple.
nanga 1) conj. and (conjoins noun phrases). 2) prep. with, together with. 3) prep. against, opposed to.
nanga krin ai wide awake.
nanga opo mofo surprised, amazed.
nangra 1) n. fingernail, toenail. 2) n. claw.
napi n. cushcush edible tuber.
nasi n. fried rice dish.
nati 1) v. get wet, make wet. 2) adj. wet.
ne conj. then (at that moment).
nefi n. knife.
nefiman n. knife-fighter.
nefo 1) n. nephew. 2) n. cousin.
neigi num. nine.
neigitenti num. ninety.
neki 1) n. neck. 2) n. throat. SYN: gorogoro.
neki-olo 1) n. throat. 2) n. neck opening in clothing.
neleki prep. just like, as if. SYN: soleki.
neleki fa just like.
nen 1) n. name. 2) v. be named.
tyari nen 1) bear name. 2) be a scapegoat.
nene n. grandmother, old woman.
nengre 1) n. Creole, black person. 2) adj. Creole. 3) n. man. 4) n. Sranan Tongo language.
nengredoro n. yard gate.
nengregron n. personal garden plot.
nengrekondre n. Africa. SYN: Afrikakondre.
nengre-oso n. small house in yard.
nengresiki n. spiritual/psychosomatic illness.
nengretongo n. Sranan Tongo language.
nesi n. nest.
neti n. night, nighttime.
niri n. kidney.
nyan en niri be aggravated about something.
no 1) adv. not. 2) interj. no. 3) interj. sentence tag.
no wan quan. none at all, not one.
no wan presi nowhere.
nofo adj. enough. SYN: sari2.
nofotron adv. often, frequently.
noiti adv. never.
nomo 1) adv. only. 2) adv. however, but.
nomonomo adv. on and on, continually. SYN: dorodoro2.
nomru n. number.
nono interj. no, not at all, no way.
noso1 n. nose.
bro noso blow one's nose.
broko noso give off pleasant aroma.
hari noso 1) sniffle. 2) stick nose up in air.
noso2 conj. otherwise, or.
nosobonyo n. nose septum.
nosolinga n. nose ring.
noso-olo n. nostril.
noti prn. nothing.
not'noti prn. nothing at all (emphatic).
now adv. now.
nownow adv. immediately, right now. SYN: wantron; wantewante.
nownowde adv. nowadays, at this time.
nowtu n. need, problem, difficulty, trouble. SYN: problema; dyam; broko-ede.
nyan 1) v. eat. 2) v. spend, use up, waste money. 3) v. suffer, endure.
nyan en niri be aggravated.
nyan wan sma nanga mofo talk circles around someone.
nyangron n. personal food garden.
nyanman n. glutton. SYN: akanswari.
nyan-oli n. cooking oil.
nyansani n. food, things to eat.
nyanyan n. food, meal.
gi nyanyan feed.
nyofi adj. very small, tiny. SYN: nyoni; pikinpikin.
nyoni adj. very small, undersized.
nyun adj. new. ANT: owru1.
nyunsu n. news.
nyunyari n. New Year's Day.
nyunyun adj. brand-new, very new.
nyunyun pikin newborn baby.

o1 aux.v. future tense marker (will, going to).
o2 adv. how (used before adjectives: o langa, o bradi, o hei, o lati).
o langa how long.
o lati what time.
obe n. oil palm tree & fruit.
obia n. magical medicine, Winti charm.
obiaman n. healer, medicine man in Winti.
odi 1) n. greetings. 2) interj. hello.
taki odi greet, say hello.
odo n. proverb, saying.
koti odo use a proverb.
ofisiri n. military officer.
ogri 1) adj. naughty. 2) adj. evil, bad, dangerous. 3) n. something bad, stroke of bad luck.
ogri-ai 1) n. evil eye. 2) n. sickness caused by evil eye.
ogri-ati 1) n. evil, malevolence. 2) adj. mean, cruel.
ogridu n. evil deeds, wickedness.
ogriman n. evildoer.
ogrimeti n. wild dangerous animal.
okasi n. opportunity, chance.
okro n. okra.
okrobrafu n. okra soup.
olanga adv. how long.
olati adv. what time.
oli 1) n. cooking oil. 2) n. oil, lotion, ointment. 3) n. gasoline.
olilampu n. kerosene lamp.
olo n. hole, opening, gap.
krabu wan olo dig a shallow hole.
oloisi n. watch, clock.
luku oloisi tell time.
olo-olo 1) n. potholes, lots of holes. 2) adj. full of holes.
oma 1) n. grandmother. 2) title. older woman.
omeni adv. how many, how much.
omeni langa how long.
omeni langa kba for a long time already.
omu 1) n. uncle. 2) n. Chinese storekeeper.
ondro 1) prep. under, among. 2) v. submit.
ondro-anu n. armpit.
ondrobere n. lower abdomen.
ondrobruku n. underpants.
ondrofeni 1) v. experience, discover. 2) n. experience.
ondrofeni tori n. story with a lesson.
ondrofutu n. sole of foot.
ondrosuku 1) v. investigate, examine, study. 2) n. investigation, study.
ondrow 1) n. maintenance. 2) v. maintain.
onfu n. oven.
ongoloku 1) n. accident, adversity, bad luck. 2) adj. unlucky. ANT: koloku.
oni n. honey; honey bee.
onigodo n. beehive.
onti 1) v. hunt. 2) n. hunt, hunting trip.
ontidagu n. hunting dog.
ontigon n. hunting rifle.
ontiman n. hunter.
opo1 1) v. open, open up. 2) adj. open. 3) v. unlock. 4) adj. unlocked. 5) v. clear up (weather).
wai opo blow open.
opo2 1) v. get up, stand up. 2) v. sprout.
opo3 1) v. lift, pick up. 2) v. raise prices/salaries.
opo4 v. begin, start on something.
opo doro unexpected opportunity.
opo oso empty house.
opolangi n. airplane. SYN: kisi1; isrifowru.
opo-opo 1) n. party. 2) n. fanfare, big fuss.
opo-oso 1) n. roof-raising party for new house. 2) n. house dedication.
opruru 1) n. disturbance, riot. 2) n. racket, clamor. 3) adj. noisy, rowdy.
orga 1) v. arrange, organize. 2) n. organization.
ori 1) v. hold, hold onto. 2) v. grab, catch. 3) v. keep, retain. 4) v. keep well (food). 5) v. have an affair.
ori ensrefi restrain oneself, have self-control.
ori ai na tapu keep an eye on.
ori baka support.
ori bere become pregnant.
ori doro persevere, keep going.
ori kerki hold a church service.
ori na ati hold a grudge.
ori na baka 1) withhold. 2) hold back.
ori na spotu make fun of.
ori stan stand firm, hold ground.
ori wakti keep watch.
oso 1) n. house. 2) n. household.
broko-oso broken-down house, shack.
opo oso empty house.
-oso suffix. building used for purpose (datra-oso, doti-oso).
osodresi n. home remedy.
osofowru n. layer chicken.
osokrosi n. house clothes.
osowroko n. housework.
osoyuru n. rent money.
oten 1) adv. when. 2) conj. when, whenever.
oto n. car, automobile.
owktu adv. too, also, as well.
owru1 1) adj. old. 2) v. age, grow old. ANT: yongu.
owru2 n. machete, cutlass.
owrukuku1 n. fer-de-lance snake. SYN: labaria.
owrukuku2 n. owl.
owruten adj. old-fashioned.
owruwan n. old person / old one.
owruyari 1) n. December 31. 2) n. day before birthday.

Pa title. term of address for important older man.
padi n. threshed unmilled rice.
pagara n. string of firecrackers; large firecracker.
pai 1) v. pay, reward. 2) n. pay, salary, wages. 3) n. offering to spirit/god.
tyari wan pai bring an offering.
paiman 1) n. debt. 2) n. payment, reward.
ferplekti paiman debt one cannot get out of paying.
paki1 n. packet, package, parcel.
paki2 n. suit (clothing).
pakira n. collared peccary.
pakro 1) n. snail. 2) n. snail shell.
paksoi n. bok choy, Chinese cabbage.
palmbon n. palm tree.
palulu n. bird of paradise plant; South American travelers palm.
pampun n. pumpkin, squash.
pan n. pan.
pangi n. Maroon woman's wrap/loincloth.
pankuku n. pancake.
panti 1) v. pawn. 2) n. security, collateral for loan.
poti na panti pawn something.
pant'oso n. pawnshop.
panya 1) v. spread, scatter. 2) v. shatter, blow up.
panyapanya 1) v. scatter in disorderly way. 2) adv. scattered about.
papa1 1) n. porridge. 2) adj. mushy.
papa2 n. father.
papasneki n. boa constrictor.
papaya1 n. papaya fruit/tree.
papaya2 n. woven sleeping mat.
papira 1) n. paper. 2) n. document, diploma.
naki papira fill out form, make report.
papira moni paper currency.
pardon 1) n. forgiveness. 2) interj. excuse me.
gi pardon forgive.
pari 1) v. paddle a boat. 2) n. paddle.
pasa1 v. happen (psa1).
pasa2 prep. by, past (psa2).
pasensi n. patience.
pasi n. road, path, street.
gi pasi give permission.
koti pasi take a shortcut.
koti pasi gi avoid someone.
lasi pasi lose one's way, get lost.
prati pasi go separate ways.
syatu pasi take a shortcut.
tapu pasi block, obstruct.
teki pasi leave, go away.
Paska n. Easter; Passover.
paskadoifi n. dove species.
pata n. tennis shoes, sneakers.
pataka n. wolf fish, tiger fish.
patata 1) n. potato. 2) n. sweet potato. SYN: swit'patata.
patron n. cartridge, bullet. SYN: lai2; kugru.
patu n. pot, cooking pot.
patyapatya adj. soggy, swampy, marshy.
pe 1) adv. where. 2) conj. where. 3) n. place. SYN: presi.
peipi n. pipe, tube.
peiri n. arrow. CPART: bo2.
pemba n. white kaolin clay.
pen1 n. pain, ache. SYN: skin-ati.
pen2 n. animal stall, pen, stable.
pen3 n. pen (writing instrument).
pen4 n. clothespin.
peni adj. spotted, speckled.
penitigri n. spotted jaguar.
pepre 1) n. pepper. 2) adj. spicy, hot. 3) adj. difficult. 4) adj. hot sun.
peprementi n. peppermint.
peprewatra n. hot pepper and fish soup.
per n. light bulb. SYN: lampu.
perki n. pill, tablet.
pesi n. pea, bean.
petepete adv. soaking wet.
peti n. well, water spring.
pî adj. very quiet, silent.
piaiman n. Amerindian medicine man.
pikadu n. sin. SYN: sondu.
piki1 1) v. answer. 2) v. inform, tell. 3) n. answer, reply.
piki2 1) v. pick up. 2) v. pick leaves/fruit off stem. 3) v. choose, select. 4) v. take up collection. 5) v. sort dirt out of rice.
pikin1 1) adj. small, little. 2) adj. young. 3) quan. a little.
pikin2 1) n. child. 2) n. girl. 3) n. animal baby.
meki pikin give birth, have baby.
nyunyun pikin newborn baby.
pikin pikin children's children (descendants).
tap'bere pikin last child.
pikinfinga n. little finger.
pikinfowru n. songbird.
pikinkapasi n. broad-banded armadillo.
pikinman n. person of low position.
pikinmasra n. young man.
pikinmisi n. young woman.
pikinmoni n. small change, coins.
broko na pikinmoni explain simply.
pikin-nengre n. child.
pikinpikin 1) adj. very small, tiny. 2) adv. from an early age.
pikinsensi n. small change.
pikinso 1) quan. a little. 2) adv. a little.
pikintiki berpe n. public pauper cemetery.
pina1 1) v. suffer, inflict suffering. 2) n. suffering, poverty. 3) v. be scarce. 4) adj. poor, run-down.
pina leki wan kerki-alata poor as a church mouse.
pinabon n. pina palm tree.
pinakampu n. shelter made of palm fronds.
pinaman n. poor person, sufferer.
pinapina v. make do, limp along.
pinaten n. time of suffering, period of shortage.
pinda n. peanut.
pindakasi n. peanut butter.
pindasupu n. peanut soup.
pingi 1) v. pinch, tweak. 2) v. pluck guitar strings. 3) n. tip, hint. 4) v. tip off.
pipa1 1) n. smoking pipe. 2) n. pistol.
pipa2 v. gasp for air, take last breath.
pipel n. people, nation. SYN: folku.
pipi n. penis. SYN: toli; toitoi.
pir'ede adj. bald-headed. SYN: kreb'ede.
piren n. piranha fish.
piri 1) v. peel fruit. 2) v. spread wide. 3) v. flake, peel skin. 4) v. go bald.
piri ai look with wide open eyes.
piri ai gi 1) admonish, warn. 2) pay close attention to.
piri ede shave head.
piri tifi smile / bare teeth.
pir'tifi n. smirk, grin.
pis'duku n. diaper.
pisi1 n. piece, part.
pisi2 1) n. urine. 2) v. urinate.
pis'patu n. potty, commode, chamber pot.
pisten n. short time, a little while.
a srefi pisten dati meanwhile, at the same time.
planga1 1) n. plank, board. 2) v. hit with a board.
plata 1) adj. flat, low. 2) adj. shallow. 3) adj. thin, broke (no money). 4) v. flatten, level out. 5) v. make lower. 6) v. become shallow.
plei1 v. cheat, trick. SYN: bedrigi.
plei2 n. toilet, outhouse.
plekti n. duty, responsibility. SYN: ferplekti.
ploi 1) v. put a crease/fold. 2) n. pleat, crease, wrinkle.
poko v. balance on bicycle.
tan poko fail a grade in school.
poku 1) n. music. 2) n. audio recording.
drai poku play records/tapes.
naki poku play percussion music.
pokugrupu n. music band, group.
pokuman n. musician.
pompu 1) n. pump. 2) v. pump up.
pon n. baked cassava & chicken casserole (pom).
pondo 1) n. barge. 2) v. ferry across river.
ponpon1 n. pomelo citrus fruit.
pontaya n. cultivated tuber for pom.
pontu 1) n. pound (500 grams). 2) n. weight.
popki 1) n. doll. 2) n. statue, idol.
popokai n. parrot.
pori1 1) v. spoil, ruin. 2) v. rot. 3) adj. spoiled, rotten. 4) v. separate, divorce.
pori2 1) v. spoil/pamper a child. 2) adj. spoiled child.
portmoni n. wallet, purse.
posentri n. sandbox tree.
postu 1) n. post. 2) n. beam.
poti v. set, put, lay, place.
poti faya gi set on fire.
poti fertrow tapu put trust in.
poti na panti pawn something.
poti na tesi put to the test.
poti prakseri pay attention to, think about.
poti sten vote.
poti tapu asin pickle in vinegar.
poti tapu en presi put someone in their place.
pôti adj. poor. ANT: gudu. SYN: mofina; pina1.
pôti mi interj. expression denying guilt/involvement.
tye pôti interj. poor thing! Too bad!
pôtisma n. poor or needy person.
Potogisi 1) n. Portuguese person/Jews. 2) adj. Portuguese. 3) n. Portuguese language.
pototo n. things, stuff, junk.
powa n. biceps, physical strength.
tyari powa be strong.
powema n. poem. SYN: mobo.
prakseri 1) v. think. 2) v. think about, ponder. 3) n. thought, idea. 4) n. plan, intention.
kon nanga wan prakseri come up with an idea.
poti prakseri pay attention to.
prakseri go prakseri kon contemplate from all sides.
pramisi 1) v. promise. 2) n. promise.
pranasi n. former plantation village.
prani 1) v. plant seeds/bushes. 2) v. plant a field.
prasara n. palm trunk pole.
prasi1 n. yard, lot. SYN: dyari.
prasi sisibi n. lawn rake.
prasi-oso n. small house in back yard.
prasoro n. umbrella.
prati 1) v. divide, separate. 2) n. division. 3) v. distribute, share.
abi prati have a share in.
teki prati participate, take part.
prati fatu fun-loving.
prati libi divorce.
prati pasi go separate ways.
prefu conj. instead of.
prefuru v. dare. SYN: dorfu.
prei 1) v. play. 2) v. play musical instrument. 3) v. bewitch, put spell on. 4) v. trick, fool.
prei karta play cards.
preiki 1) v. preach. 2) n. sermon.
preikiman n. preacher.
preiprei 1) adv. in a playful/joking manner. 2) adj. pretend.
preisani n. toy.
preiskoro n. pre-school, kindergarten. SYN: yosyosi-skoro.
prekti n. obligation, duty (plekti).
pren n. town square, public area.
prenki n. picture, photo. SYN: fowtow.
prenspari adj. important. SYN: funamku; hei1.
presi n. place, room. SYN: pe.
opo presi job opening.
poti tapu en presi put in one's place.
wan presi somewhere.
no wan presi nowhere.
pret'duku n. dish towel, tea towel.
preti n. plate.
prijs1 n. prize, award.
prijs2 n. price, cost.
prijse v. praise.
primisi n. permission, authorization.
prisiri 1) v. be happy. 2) v. have fun, celebrate. 3) n. pleasure.
abi prisiri enjoy.
gi prisiri please, give pleasure.
meki prisiri celebrate.
prisiri kawna n. secular kawna music for enjoyment.
pristeri v. offer something to someone.
proberi v. try (pruberi).
problema n. problem, difficulty.
prodo 1) v. show off. SYN: meki modo. 2) n. pomp, show.
prodoman n. dandy. SYN: modoman.
prodomisi n. stylish lady.
profen n. spirit of unbaptized deceased person (Winti).
pruberi v. try. Mi ben pruberi fu kon esde.
psa1 v. happen. Yu yere san psa ini a kondre?
psa2 1) v. pass, pass by. 2) prep. by, along, past.
psa3 1) v. pass through. 2) v. spend time. 3) v. endure, get through.
psa4 v. pass an exam/grade. SYN: abra.
psa marki extraordinarily, exceedingly.
psa mofo disobey.
Ptata1 n. the Netherlands. SYN: bakrakondre.
pu n. bottle gourd, calabash gourd.
pudya n. small conical drum.
puiri 1) n. powder. 2) v. powder, pulverize.
puirisukru n. powdered sugar.
puru 1) v. remove, take away. 2) v. rescue in time of need, save. 3) v. solve a riddle / expose a lie.
koti puru cut off, amputate.
puru atibron tapu take out anger on.
puru bere abort pregnancy.
puru mofo take back what was said.
puru smoko give off smoke.
puru taki words coming out of mouth.
puspusi n. cat. Felis catus.
puspusi-owrukuku n. barn owl.
pusu v. push.
pusu puru push away, shove out of way.
puwema n. poem. SYN: powema.

rafru n. macaw bird.
rai 1) n. advice, counsel. 2) v. guess. 3) n. riddle.
gi rai advise, give advice.
raiman n. advisor. SYN: bakaman.
raitori n. riddle, mystery.
rasper n. fer-de-lance snake. SYN: labaria; owrukuku1.
redi adj. red, brownish-red.
redi kopro n. copper.
redidia n. large red brocket deer.
redikaiman n. dwarf cayman.
redinengre n. brown-skinned creole.
redipiren n. red piranha.
reditere n. fire snake, black racer.
reditigri n. puma, cougar.
refrensi 1) n. revenge. 2) v. avenge, take revenge.
teki refrensi take revenge.
rei1 1) v. drive car/truck, ride bike, sail boat, fly plane. 2) v. ride with someone.
rei2 v. trick someone, make a fool of. SYN: kori; kisi2.
rèis n. flat lead disk used in marble games.
respeki n. respect (lespeki).
reti v. be right (leti2).
rigeri 1) v. storm about, raise Cain, throw tantrum. 2) v. rule, govern. SYN: tiri2.
rosen n. raisin.
rostu 1) v. rest. SYN: bro futu; hari baka. 2) n. rest.
rostupresi n. place to rest.
roti n. Hindustani flatbread.
row 1) v. grieve, mourn. 2) n. grief, mourning.
rowkrosi n. mourning clothes.
rowsu n. rose flower.
rutu 1) n. root of plant. 2) n. ancestry, lineage, roots. 3) n. cause, origin.
rutu puru dig/pull out by roots.

Sa1 title. madam, lady, sister (older woman).
sa2 aux.v. future tense marker (will, shall). Efu a no kon tide, a sa kon tamara.
sa3 1) v. saw wood/metal. 2) n. saw tool.
sabadei n. Sabbath.
sabaku n. egret, cattle egret.
sabana 1) n. savannah. 2) n. grave, happy hunting grounds.
sabi 1) v. know. Mi no sabi fa fu meki boyo. 2) n. knowledge, science.
sabiman n. learned man, expert.
sabiso adj. know-it-all.
safri 1) adv. softly, quietly. 2) adv. gently, without movement. 3) adv. slowly.
safri nanga be careful with something.
safri-ati 1) n. gentleness, meekness. 2) adj. gentle.
safrifasi n. gentleness, meekness.
safrisafri adv. very slowly, gradually, little by little. Safrisafri e nyan switi.
safu 1) adj. soft. 2) v. soften, become tender. 3) adj. gentle, tender (heart).
safu wiwiri moderately curly hair.
sai v. sow seeds.
saka1 1) n. sack, bag. 2) n. pocket.
saka2 1) v. come down, go down, sink, descend. 2) v. land an airplane. 3) v. get off bus. 4) v. let off passenger. 5) v. lower, set down. 6) v. get better (fever/pain). 7) v. turn down volume/fire.
saka ensrefi 1) humble oneself. 2) go along with decision.
saka gi wan sma give verbal thrashing to someone.
saka en skafu calm down, lower tone.
saka kindi kneel down.
saka yu ai look down, lower eyes.
sakafasi 1) n. respect, humility. 2) adj. humble.
abi sakafasi be humble.
sakapusu n. unreliable vehicle, bucket-of-bolts, lemon.
sakasaka 1) n. crumbs, scraps, pulp, coffee grounds. 2) n. trash, good-for-nothing. 3) v. humiliate. 4) adj. low-down.
sakasneki n. rattlesnake.
sak'duku n. handkerchief. SYN: saka-anyisa.
saksi n. sawdust, woodchips.
salfu 1) v. anoint. 2) n. spiritual anointing.
sali n. hemoglobin level in blood.
samasama n. junk, stuff. SYN: bagasi; pototo; taitai.
sambo n. mixed race person (Negro & Amerindian).
san 1) prn. what. San yu e kon du dyaso? 2) rel.prn. that, which. 3) conj. what. 4) interj. expresses surprise.
san meki why. SYN: sanede.
sanede 1) adv. why (for what reason). 2) conj. why.
sangabanga v. chew someone out, scold severely. SYN: kosi1.
sani 1) n. thing, stuff. 2) v. do, fix, arrange.
wan sani something.
santa adj. holy.
Santa Yeye n. Holy Spirit.
santi 1) n. sand, dirt. 2) adj. sandy, dirty. 3) v. get dirt on something.
sapakara n. tegu lizard.
sapakarasneki n. black and yellow ratsnake.
sarasara n. shrimp.
sar'ati n. compassion, pity.
sari1 1) v. have pity on, feel sorry for. 2) v. be sorry, regret. 3) v. mourn. 4) adj. sad, sorrowful. 5) adv. pitifully. 6) n. grief, sorrow.
sari2 1) adv. enough, sufficient. SYN: nofo. 2) v. satisfy, be enough.
sasi v. rummage, ransack.
satra n. Saturday.
sawarinoto n. souari nut.
se n. sea, ocean.
se watra seawater.
sebiyari n. lima bean (seibiyari).
sedre n. cedar wood, cedar tree.
sei 1) n. side. 2) n. side of body. 3) prep. beside.
ala sei everywhere, every part.
dat' sei over there, that way.
de na en sei take someone's side.
dis' sei this side.
tra sei other side.
-sei suffix. direction/location suffix (fotosei).
seibere n. side of body.
seibi num. seven.
di fu seibi adj. seventh.
seibitenti num. seventy.
seibiyari n. lima bean.
seibowtu n. groin, crotch.
sei-ede n. side of the head.
seifesi n. cheek.
seigi 1) v. bless. 2) n. blessing. SYN: blesi.
seimofo 1) n. corner of mouth. 2) n. inside of cheek.
seiri 1) v. sail. 2) n. sail. 3) v. walk like a drunk. 4) v. throw hard.
seiriboto n. sailboat.
seirisaka n. burlap bag, gunnysack.
seisei n. side, edge. SYN: kanti; lanki.
sekanti n. shore, beach. SYN: syoro.
na sekanti out to sea.
seki v. shake, wobble.
seki ede nod or shake head.
seki mofo speak.
sekrepatu n. turtle, tortoise.
sekretarsi n. secretary.
sek'seki 1) n. rattle, maraca. 2) v. be unstable/wobbly. 3) v. shake back and forth.
seku n. manatee.
sek'watra n. storm, turbulent water. SYN: skwala.
sèm adj. same. SYN: srefi; speri1.
semprefisi n. aloe vera plant.
seni v. send.
seni gwe send away.
seni kari call, summon.
sensi1 1) n. cent, penny. 2) n. money. SYN: moni.
sensi2 conj. since.
senwe 1) n. nerve. 2) n. nervous disorder. 3) n. nervousness. 4) v. be nervous.
gi senwe make nervous.
seri 1) v. sell. 2) v. betray, sell out.
seriman n. salesman, merchant.
seryusu adj. serious.
sesei n. scissors (sisei).
sespari n. salt-water stingray.
seti 1) v. arrange, set in order. 2) v. set clock/timer.
seti libi live together with someone.
setkoiri n. whitlow, felon infection on finger.
si v. see.
kon si realize, recognize.
sibi v. sweep floor. SYN: figi.
sibibusi n. downpour, heavy rainstorm. GEN: alen.
sidon v. sit.
tan sidon fail a grade in school.
sidon baka trarki be in jail.
sidonpresi n. seat.
sigara n. cigar.
sika n. sand flea, jigger. Tunga penetrans.
siki 1) adj. sick, ill, injured. 2) v. be sick, become sick. 3) v. make sick. 4) v. make someone lovesick. 5) n. sickness, disease.
sikibedi n. sickbed.
sikiman n. sick person.
sikisiki 1) v. be frequently sick. 2) adj. sickly, handicapped.
sikisma n. sick person.
sikiwan n. sick person or animal.
siksi num. six.
di fu siksi adj. sixth.
siksikanti n. leatherback sea turtle. SYN: aitikanti.
siksitenti num. sixty.
siksiyuru n. cicada. SYN: sinsin2.
sili n. soul, spirit.
sin ideophone. high-pitched whistle.
singi 1) v. sing. 2) n. song, musical piece.
singibuku n. songbook.
singiman n. singer.
sinsin1 n. tambourine.
sinsin2 n. cicada.
sipi n. ship.
sipifowru n. swallow-tailed kite bird.
sipiman n. sailor. SYN: matrosi.
siri n. seed, pit, kernel.
siri-bredebon n. breadnut tree (seeded breadfruit).
sisa n. sister.
sisei n. scissors.
sisei-aka n. swallow-tailed kite bird.
siseimira n. leaf-cutting ant. SYN: prasoromira.
sisibi n. broom.
prasi sisibi lawn rake.
skafu 1) v. plane wood / shave ice / scrape knee. 2) n. wood plane.
saka en skafu calm down, lower tone.
skapu n. sheep.
pikin skapu lamb.
skapuloiri n. two-toed sloth.
skapuman n. shepherd.
skarki n. shallow bowl.
skedrei n. picture, painting. SYN: prenki; fowtow.
skefti1 1) v. sour (milk), spoil. 2) adj. sour.
skefti2 v. barely miss, graze.
skempi v. taunt, jeer, scoff. SYN: dreigi.
skepi v. brag, boast. SYN: dyaf.
sker'ai n. crossed eyes.
luku nanga sker'ai give a dirty look.
sketnoto n. physic nut, purging nut.
skin 1) n. body. 2) n. skin, hide. 3) n. outer wall/surface of house or vehicle.
abi krin skin be a lucky person.
gro skin shudder, get goose bumps.
hari skin massage / spank.
krin skin presentiment.
priti skin give a whipping.
skin piki have a premonition.
weri skin 1) make tired. 2) fatigue.
yere skin annoying, pain in the neck.
skin-ati n. bodily pain.
skiti n. sperm.
skoifi v. move with sliding motion, push.
skoifineki n. twist-neck turtle.
skoins'ai n. glaring look from corner of eye.
skoinsi adv. slanting, oblique, at an angle.
afu skoinsi at a slight angle.
skopu1 v. kick.
skopu en fara get ahead in life.
skopu2 n. spade, shovel.
diki skopu dig ditches.
skoro 1) n. school. 2) v. instruct.
teki skoro go to school.
skorobangi n. school desk.
skoro-ifrow n. female school teacher. SYN: skoromisi.
skoromeister n. male school teacher.
skoromisi n. female school teacher.
skoropapira n. diploma, certificate.
skoropikin n. school-aged child.
skoroprasi n. schoolyard, school grounds.
skotriki1 n. saucer.
skotu 1) n. fence, wall. 2) v. build a fence. 3) v. put an end to conversation. 4) v. leave out, ignore.
skotu lontu build a fence around.
skowru n. shoulder.
hari skowru shrug shoulders.
skowtu 1) n. police. 2) n. police officer.
skowt'uma n. policewoman.
skowtu-oso n. police station. SYN: lont'oso.
skrati 1) n. hot cocoa, chocolate. 2) n. unsweetened cocoa block.
faya skrati hot chocolate.
ososkrati home-made cocoa blocks.
puiriskrati cocoa powder.
sukruskrati sweetened chocolate / cocoa.
skreki1 1) v. frighten, startle. 2) v. be frightened, surprised. 3) n. fright.
tapu skreki instill fear in, threaten.
skreki2 1) v. sear meat/chicken by quick frying. 2) v. heat up food.
skrifi 1) v. write. 2) v. be written.
skrifiman 1) n. author, writer. 2) n. plantation clerk.
skrobu v. scrub. SYN: skuru. FROM NL: schrobben.
skropu n. seashells.
skrufu1 1) n. screw, bolt. 2) v. screw.
skrufu2 n. joint of body.
skuma 1) n. foam, suds, scum. 2) v. foam, suds.
kuku skuma ferment (producing foam).
sopo skuma soapsuds.
skuru 1) v. scrub, scrape, scour. FROM NL: schuren. 2) v. speak abusively to. SYN: kosi1.
skwala n. giant wave, swell.
sma n. person, human being. SYN: libisma.
ala sma everyone.
dorosei sma foreigner.
ibri sma each person.
iniwan sma whoever, anyone.
son sma some people.
-sma suffix. person suffix (dedesma, granisma, fotosma).
smara 1) adj. narrow. ANT: bradi. 2) adj. small, tight. ANT: bigi.
smèlter v. melt. FROM NL: smelten.
smenti n. cement.
smeri 1) v. smell. 2) v. give off aroma/stench. 3) n. smell, odor, aroma.
smeti n. smith, metalworker.
smoko 1) v. smoke cigarette/pipe. 2) v. give off smoke. 3) v. preserve with smoke. 4) n. smoke, steam. 5) adj. smoked. 6) v. disappear, vanish.
smokopatu 1) n. mosquito smoke pot. 2) n. car that smokes a lot.
smuru1 1) v. feel oppressed from lack of ventilation, suffocate. 2) v. become damp with steam. 3) v. cook over low fire in covered pan.
smuru2 n. mouth (derogatory: shut your smuru!).
snapu v. stand (tnapu).
sneiri n. tailor. SYN: kleri; kleriman.
Sneisi1 1) n. Chinese person. 2) adj. Chinese.
sneisi2 n. flea.
sneisi puiri 1) n. medicinal headache powder. 2) n. Chinese spice.
sneisi-alatria n. Chinese vermicelli.
sneisitaya n. taro tuber (eddo/coco).
snek'fisi n. marbled swamp eel. SYN: logologo.
sneki n. snake.
snekimarkusa n. small wild passion fruit.
snoifi 1) v. sniff, sniffle. 2) v. snort.
snoiti v. blow one's nose.
snorku v. snore.
snuku n. snook fish.
so 1) conj. so, therefore. 2) adv. so, like so. 3) adv. such.
sobun 1) conj. in other words. 2) conj. sometimes.
sodra adv. as soon as.
sodro n. upstairs, attic. ANT: gron.
sofasi conj. thus, in such a way.
soi adj. boring, dull.
soifri adj. pure. SYN: krin.
soigi v. suck.
soigi gwe v. soak up, soak into.
sokekwikwi n. fresh-water armored catfish.
soktu 1) v. sigh. 2) n. sigh.
solanga 1) conj. as long as. 2) conj. whenever, every time.
soleki conj. such as.
soleki fa conj. just as, in the same way.
solfru 1) n. silver. 2) adj. silver.
solfrumoni n. silver coin.
someni 1) adj. so many, so much. 2) adv. very much.
someni langa kba a long time ago, for a long time now.
son1 n. sun.
son2 prn. some.
son leisi sometimes. SYN: son ten; son tron.
son sma some people.
son ten sometimes.
son tron sometimes.
sonde n. Sunday.
sonde wowoyo n. Sunday market outside town.
sondro adv. without. ANT: nanga.
sondu n. sin. SYN: pikadu.
sondusma n. sinner.
sonloiri n. three-toed sloth.
sonwan prn. some.
sopi 1) n. alcoholic beverage. 2) n. rum.
sopibere n. beer belly.
sopikuku n. rum cake.
sopiman n. drunkard, alcoholic.
sopo n. soap.
swit'sopo fragrant bath soap.
wan pisi sopo bar of soap.
sopo skuma soapsuds.
sopo watra soapy water.
sopropo n. carilla, bitter gourd vegetable.
sor'ai n. eye infection.
sorfu n. silver (solfru).
Sorgu n. Zorg en Hoop neighborhood in Paramaribo.
sorgu 1) v. care for, take care of. 2) n. worries, cares.
sori 1) v. show, point out. 2) v. teach someone a lesson. 3) v. seem like, appear as.
soro 1) n. sore, wound, infection. 2) adj. infected, painful.
diki wan soro pick at a scab.
soromarki n. scar.
sorosoro n. many sores/wounds.
sortu 1) n. kind, sort, species. 2) prn. which, what kind. 3) rel.prn. which, what kind.
soso 1) adv. just, only. 2) adj. empty.
fu soso 1) free, cheap. 2) without result, for nothing.
sosofutu adv. barefooted.
sososani n. silly or unimportant things.
sososkin adj. naked, bare.
sosrefi 1) conj. in addition to, also, in same way. 2) conj. including, even.
sote adv. so much, to a high degree, a lot.
sowan adj. of the same kind.
sowsu n. sauce, gravy.
sowt'aleisi n. plain cooked rice served with salt.
sowt'amsoi n. bitter greens soaked in brine (sauerkraut style).
sowt'fisi n. salt fish. SYN: batyaw.
sowt'lemki n. salted pickled limes.
sowt'meti n. corned beef in brine.
sowt'sani n. salty snack foods, chips.
sowtu1 1) n. salt. 2) adj. salty. 3) v. preserve with salt.
sowtu poti wait for right moment to get back at someone.
sowtu2 n. wart.
sowtu3 adj. unlucky.
sowt'watra n. salt water, brine.
span 1) adj. exciting, tense. 2) n. excitement, tension. 3) v. be upset or angry. 4) v. tighten, stretch out. 5) adj. tight, full. 6) v. load a gun. 7) adj. loaded gun.
No span! Don't worry!
spansfrow n. praying mantis.
Spanyoro 1) n. Spaniard, Spanish speaker. 2) adj. Spanish. 3) n. Spanish language.
Spanyorokondre n. Spain.
spare n. spare tire (speri2).
spari n. stingray fish.
speri1 1) adj. the same, alike, equal. 2) n. peer group, same age group.
speri2 n. spare tire. VARIANT: spare.
spesrei 1) n. spice, seasoning. 2) v. marinate meat.
spesrutu 1) adj. special, specific. 2) adv. especially.
spikri1 1) n. nail. 2) v. nail.
spikri2 n. mirror.
spiti 1) v. spit, spit out. 2) n. spittle.
spoiti 1) v. spray, squirt. 2) v. vaccinate, give injection. 3) n. vaccination, injection. 4) n. syringe.
naki spoiti give an injection.
teki spoiti get vaccinated.
sponsu n. sponge.
spotu n. joke, prank.
a no spotu an exceptional amount, not to be sneezed at.
meki spotu nanga mock, make fun of, tease.
ori na spotu mock, make fun of.
spotuman n. joker, prankster. SYN: komediman.
sprenka n. grasshopper, locust.
sproiti v. sprout, germinate.
spuku 1) n. ghost. 2) v. be haunted. 3) v. give unexplained trouble (car/machine).
spun 1) n. spoon. 2) v. spoon out.
spuru v. wash, rinse clothes. FROM NL: spoelen.
srafu n. slave.
srafumasra n. slave master.
srafumisi n. slave mistress.
srafuten n. slavery era.
srakti v. butcher, slaughter.
sraktiman n. butcher.
srakti-oso n. slaughterhouse, butcher shop.
Sranan 1) n. country of Suriname. 2) adj. Surinamese. 3) n. Sranan Tongo language.
Sranan Tongo n. language of Suriname. SYN: Sranan; Takitaki.
Sranankondre n. Suriname.
Srananliba n. Suriname River.
Srananman n. Surinamer, Surinamese person.
srapu 1) adj. sharp. 2) v. sharpen. 3) adv. clearly. 4) adj. clever, sharp-minded.
srefi 1) adj. same. 2) adv. places emphasis on subject (even, self).
srefidensi n. independence. SYN: manspasi.
srefsrefi adv. puts strong emphasis (really, truly).
sreka v. prepare.
srepi v. drag, tow.
sriba n. small silver-colored bait fish.
sribi 1) v. sleep. 2) n. sleep, sleepiness.
go sribi go to bed.
sribikamra n. bedroom.
sribikrosi n. pajamas, nightgown, blanket.
sribisani n. sheets, blankets, sleepwear.
sroisi n. sluice gate.
sroiti adj. miserly, stingy.
sroto 1) n. lock. 2) n. key. 3) v. lock. 4) adj. locked. 5) v. lock up in jail.
srudati n. soldier, military person.
srudati kampu military base, bivouac.
s'sa n. sister (sisa).
s'sibi n. broom (sisibi).
s'so adj. empty (soso).
s'su n. shoes (susu).
stampu1 1) v. pound, mash peanuts/plantains. 2) v. stamp feet.
stampu2 adj. stocky, thick-set.
stampu3 1) v. stamp, place seal on document. 2) n. seal, stamp.
stari n. star.
steifi 1) adj. sturdy, strong, well-built. 2) adj. stiff. FROM NL: stijf.
sten n. voice.
poti sten vote.
sterapra n. star apple.
stesre 1) v. starch clothes. 2) adj. starched. SYN: goma.
stimofo n. meat, fish, and vegetables eaten with rice/bread.
stof'sani n. stewed fruit.
stofu 1) v. cook in covered pan with little water, braise, steam, stew. 2) adj. braised, steamed, stewed.
stofukronto n. coconut cooked with sugar. SYN: krontokuku.
stoipi1 n. seizure, convulsion.
stoipi-siki n. epilepsy.
ston 1) n. rock, stone. 2) n. concrete building block. 3) adj. made of stone/concrete.
broko ston broken concrete blocks.
stonbangi n. concrete bench.
stondoifi n. ground dove. SYN: stonka.
stonpopki n. statue, idol.
stotu1 v. stub toe, knock head.
stotu2 v. end, stop. A tori stotu te dya. SYN: kba; tapu2.
stowtu 1) v. whine, demand attention (children). 2) v. cry often and a lot.
straf'man n. convict, prisoner. SYN: strafuman.
straf'oso n. jail, prison. SYN: dungr'oso; lont'oso.
strafu 1) n. punishment. 2) v. punish.
de na strafu be in jail.
koti strafu serve time in prison.
leisi strafu pronounce sentence.
nyan strafu undergo punishment.
strati n. street. FROM NL: straat.
go na strati go out.
strei 1) v. compete, struggle, fight. 2) n. struggle, game, match, contest. 3) v. bet. 4) n. bet.
streiboto n. boat race.
streilon n. running race.
strepi 1) n. stripe, line. 2) adj. striped. 3) v. strike through, cross out.
hari wan strepi draw a line.
stroistroi v. sprinkle dry ingredients (sugar/candy).
strun n. lemon fruit.
strungrasi n. lemongrass plant.
stuka 1) v. study. 2) n. course of study.
stupu n. steps, raised walkway in front of house.
sturu n. chair, seat.
sukru 1) n. sugar. 2) adj. sweet. 3) v. sweeten. 4) adj. sociable, fun. 5) n. diabetes.
sukrubakba n. sweet banana variety.
sukrukandra n. sugar cube, candy.
sukrumira n. pharaoh ant.
sukrumoisi n. sprinkles, small cake candies.
sukrusani n. candy, sweets.
sukrusiki n. diabetes.
suku 1) v. seek, look for. 2) v. flirt with, chase after.
diki suku investigate thoroughly.
suku mofo be offensive / provoke.
sula n. river rapid, waterfall.
suma 1) prn. who. 2) prn. whom.
sungu 1) v. sink, flood. 2) v. be flooded, underwater. 3) v. drown. SYN: dede na watra.
sunsaka n. soursop fruit. Annona muricata.
supu n. soup.
susu n. shoe, pair of shoes.
sutu1 1) v. shoot firearm. 2) v. shoot off fireworks.
sutu2 v. explode, blow out (tire/tank).
sutu3 1) v. push or stick something into closed space. 2) v. bite, prick (mosquito/thorn).
sutu faya gi incite, egg on crowd.
sutu wan finga go na loktu raise one's hand.
sutusutu v. prod, jab repeatedly.
swa 1) adj. sour. 2) v. make sour, turn sour.
swa en fesi put on angry face, scowl.
swagri n. brother-in-law.
swai v. swing, wave.
swaki 1) adj. weak. ANT: tranga. 2) n. weakness.
swakifasi n. weakness.
swakisei n. weak spot.
swakiman n. weak one.
swampu n. swamp, marsh.
swamputodo n. Suriname toad, pipa toad.
swarfudosu n. matchbox.
swarfutiki n. matchstick.
swarfu n. match. FROM NL: zwavel.
swari v. swallow.
swasani n. pickled fruits in vinegar.
swen v. swim.
swenman n. swimmer.
sweri1 1) v. swear an oath. 2) n. oath.
sweri2 1) v. swell, rise (dough). 2) n. lump, swelling. 3) adj. swollen.
sweti 1) n. sweat. 2) v. sweat. 3) v. make an effort, exert oneself.
swipi n. parrot snake.
swit'bonki n. monkeypod tree / edible pod fruit.
switi 1) adj. delicious, tasty, pleasant. 2) adj. pleasant, nice. 3) n. delicious flavor. 4) adv. fun, happy, easy.
switismeri n. perfume, incense.
swit'kasaba n. sweet cassava (can be cooked without complex processing).
swit'patata n. sweet potato.
syabisyabi adj. shabby, slovenly.
syant n. sergeant.
syatu 1) adj. short, shallow. 2) v. shorten.
syatu pasi take a shortcut. SYN: koti pasi; boro2.
syen 1) n. shame, disgrace, embarrassment. 2) adj. shameful, scandalous. 3) v. feel ashamed. 4) v. be shy.
kon na syen be brought to shame.
syensyen v. be shy or bashful.
syinsyart n. slingshot, catapult.
syobu v. shove, push, jab.
syobusyobu v. repeatedly push or shove.
syoro n. shore, bank of river. FROM ENG: shore.
syòt n. shot of alcohol.
syow1 v. haul, carry heavy load.
syow2 n. show, spectacle.
syowman n. porter, carrier of loads.
syurkoro n. sauerkraut.
syuru adj. loose, easily pulled out or apart (hair/meat cooked to pulp).
syusyu 1) n. whisper, whispering. 2) v. whisper.
sneisi2 n. flea. Pulex irritans.
sneisi puiri 1) n. medicinal powder used for headaches. 2) n. spice.
sneisi-alatria n. Chinese vermicelli.
sneisitaya n. taro, eddo, coco edible tuber.
snek'fisi n. marbled swamp eel. SYN: logologo.
sneki n. snake.
snekimarkusa n. small wild-growing passion fruit.
snoifi 1) v. sniff, sniffle. 2) v. snort.
snoiti v. blow one's nose.
snorku v. snore.
snuku n. snook fish.
so 1) conj. so, therefore, as a result. 2) adv. so. 3) adv. such.
sobun 1) conj. in other words. 2) conj. sometimes.
sodra adv. as soon as. VARIANT: sodrai.
sodro n. upstairs, attic. ANT: gron.
sofasi conj. thus, in such a way.
soi adj. boring, dull.
soifri adj. pure. SYN: krin.
soigi v. suck.
soigi gwe v. soak up, soak into.
sokekwikwi n. fresh-water armored catfish.
soktu 1) v. sigh. 2) n. sigh.
solanga 1) conj. as long as. 2) conj. whenever, every time.
soleki conj. such as.
soleki fa conj. just as, in the same way.
solfru 1) n. silver. 2) adj. silver. VARIANT: sorfu.
solfrumoni n. silver coin.
solfrusmeti n. silversmith.
someni 1) adj. so many, so much. 2) adv. very much.
someni langa kba a long time ago, for a long time now.
son1 n. sun.
son2 prn. some.
son leisi sometimes. SYN: son ten; son tron.
son sma some people.
son ten sometimes.
son tron sometimes.
sonde n. Sunday.
sonde wowoyo n. Sunday market outside town.
sondro adv. without.
sondu n. sin. SYN: pikadu.
sondusma n. sinner.
sonloiri n. three-toed sloth.
sonte adv. maybe, perhaps.
sonwan prn. some.
sopi 1) n. alcoholic beverage. 2) n. rum.
sopibere n. beer belly.
sopikuku n. rum cake.
sopiman n. drunkard, alcoholic.
sopo n. soap.
swit'sopo n. fragrant bath soap.
sopo skuma soapsuds.
sopo watra soapy water.
sopropo n. carilla, bitter gourd vegetable.
sor'ai n. eye infection.
sorfu n. silver (solfru).
Sorgu n. Zorg en Hoop neighborhood in Paramaribo.
sorgu 1) v. care for, take care of. 2) n. worries, cares.
sori 1) v. show, point out. 2) v. teach someone a lesson. 3) v. seem like, appear as.
soro 1) n. sore, wound, infection. 2) adj. infected, painful.
diki wan soro pick at a scab.
soro-ai n. eye infection.
soromarki n. scar.
sorosoro n. many sores or wounds.
sortu 1) n. kind, sort, species. 2) prn. which, what kind. 3) rel.prn. which, what kind.
soso 1) adv. just, only. 2) adj. empty.
fu soso 1) free, cheap. 2) without result, for nothing.
sosofutu adv. barefooted.
sososani n. silly or unimportant things.
sososkin adj. naked, bare.
sosrefi 1) conj. in addition to, also. 2) conj. including, even.
sote adv. so much, to a high degree, a lot.
sowan adj. of the same kind.
sowsu n. sauce, gravy.
sowt'aleisi n. plain cooked rice served with salt.
sowt'amsoi n. bitter greens soaked in brine.
sowt'fisi n. salt fish. SYN: batyaw.
sowt'lemki n. salted pickled limes.
sowt'meti n. corned beef in brine.
sowt'meti-owru n. short straight machete.
sowt'sani n. salty snack foods, chips.
sowtu1 1) n. salt. 2) adj. salty. 3) v. preserve with salt.
sowtu poti wait for right moment to get back at someone.
sowtu2 n. wart.
sowtu3 adj. unlucky.
sowt'watra n. salt water, brine.
span 1) adj. exciting, tense. 2) n. excitement, tension. 3) v. be upset or angry. 4) v. tighten, stretch out. 5) adj. tight, full. 6) v. load a gun. 7) adj. loaded gun.
No span! Don't worry!
spansfrow n. praying mantis.
Spanyoro 1) n. Spaniard, Spanish speaker. 2) adj. Spanish. 3) n. Spanish language.
Spanyorokondre n. Spain.
Spanyoroman n. Spaniard.
spare n. spare tire.
spari n. stingray.
speri1 1) adj. the same, alike, equal. 2) n. peer group.
speri2 n. spare tire.
spesrei 1) n. spice, seasoning. 2) v. marinate meat.
spesrutu 1) adj. special, specific. 2) adv. especially.
spikri1 1) n. nail. 2) v. nail.
spikri2 n. mirror.
spikrimarki n. nail hole, scar.
spikri-olo n. nail hole.
spiti 1) v. spit, spit out. 2) n. spittle.
spoiti 1) v. spray, squirt. 2) v. vaccinate, give injection. 3) n. vaccination, injection. 4) n. syringe.
naki spoiti give an injection.
teki spoiti get vaccinated.
sponsu n. sponge.
spot'popki n. laughingstock.
spotu n. joke, prank.
a no spotu exceptional amount.
meki spotu nanga mock, make fun of.
ori na spotu mock, make fun of.
spotuman n. joker, prankster.
sprenka n. grasshopper, locust.
sproiti v. sprout, germinate.
spuku 1) n. ghost. 2) v. be haunted. 3) v. give unexplained trouble.
spun 1) n. spoon. 2) v. spoon out.
spuru v. wash, rinse clothes.
srafu n. slave.
srafumasra n. slave master.
srafumisi n. slave mistress.
srafuten n. slavery era.
srakti v. butcher, slaughter.
sraktiman n. butcher.
srakti-oso n. slaughterhouse, butcher shop.
Sranan 1) n. country of Suriname. 2) adj. Surinamese. 3) n. Sranan Tongo language.
Sranan Tongo n. language of Suriname.
Sranankondre n. Suriname.
Srananliba n. Suriname River.
Srananman n. Surinamer.
Sranansma n. Surinamese people.
sranga adv. temporarily, for the time being. Mi de dya nanga fakansi. Mi e tan sranga na mi s'sa. (I am here on vacation. I am staying temporarily with my sister). Wakti sranga. Mi e kon. (Wait a second. I'm coming).
sranti adj. insolent, impudent, cheeky. SYN: asranti.
srapu 1) adj. sharp. 2) v. sharpen. 3) adv. clearly. 4) adj. clever, intelligent.
srefi 1) adj. same. 2) adv. places emphasis on subject.
srefidensi n. independence. SYN: manspasi.
srefsrefi adv. puts strong emphasis (really, truly).
sreka v. prepare.
sren n. old coin worth 8 cents.
srepi v. drag, tow.
sriba n. small silver-colored bait fish.
sribi 1) v. sleep. 2) n. sleep, sleepiness.
go sribi go to bed.
sribikamra n. bedroom.
sribikrosi n. blanket, pajamas.
sribi-papaya n. woven sleeping mat.
sribipe n. sleeping place.
sribipresi n. sleeping place.
sribisani n. sheets and blankets.
srikasneki n. scarletsnake.
srio n. blue-black grassquit.
sroisi n. sluice.
sroiti adj. miserly, stingy.
sroto 1) n. lock. 2) n. key. 3) v. lock. 4) adj. locked. 5) v. lock up. 6) v. be locked up.
srudati n. soldier, military person.
srudati kampu n. military base.
s'sa n. sister (variant of sisa).
s'sei n. scissors (variant of sisei).
s'sibi n. broom (variant of sisibi).
s'so adj. empty (variant of soso).
s'su n. shoes (variant of susu).
stampu1 1) v. pound, mash peanuts/plantains. 2) v. stamp feet.
stampu2 adj. stocky, thick-set.
stampu3 1) v. stamp, place seal on document. 2) n. seal, stamp.
stan SEE MAIN ENTRY: ori stan.
stari n. star.
stegre 1) v. rear up on hind legs. 2) v. wheelie.
steifi 1) adj. sturdy, strong, well-built. 2) adj. stiff.
steisri adj. starched.
stèm v. tune a musical instrument.
sten n. voice.
poti sten vote.
sterapra n. star apple.
stesre 1) v. starch clothes. 2) adj. starched.
stimofo n. meat, fish, and vegetables eaten with rice/bread.
stof'sani n. stewed fruit.
stofu 1) v. cook in covered pan with little water, braise, steam, stew. 2) adj. braised, steamed, stewed.
stofukronto n. coconut cooked with sugar.
stofusani n. stewed fruits.
stoipi1 n. seizure, convulsion.
stoipi2 n. tailbone.
stoipi-siki n. epilepsy.
stompu n. tree stump.
ston 1) n. rock, stone. 2) n. concrete building block. 3) adj. made of stone/concrete.
broko ston broken concrete blocks.
stonbangi n. concrete bench.
stonbanti n. jockstrap.
stondoifi n. ground dove.
stonfutu 1) n. foundation stones. 2) n. veteran employee.
stonka n. ground dove.
stonpopki n. statue, idol.
stonskotu n. cement block wall.
stotu1 v. stub toe, knock head.
stotu2 v. end, stop. SYN: kba.
stowtu 1) v. whine, demand attention (children). 2) v. cry often and a lot.
straf'man n. convict, prisoner.
straf'oso n. jail, prison.
strafu 1) n. punishment. 2) v. punish.
de na strafu be in jail.
koti strafu serve time in prison.
leisi strafu pronounce sentence.
nyan strafu undergo punishment.
strafuman n. convict, prisoner.
strafu-oso n. jail, prison.
strati n. street.
go na strati go out.
strei 1) v. compete, struggle, fight. 2) n. struggle, game, match, contest. 3) v. bet. 4) n. bet.
streiboto n. boat race.
streilon n. running race.
strepi 1) n. stripe, line. 2) adj. striped. 3) v. strike through, cross out.
hari wan strepi draw a line.
strepistrepi adj. striped.
stroistroi v. sprinkle dry ingredients.
strun n. lemon fruit.
strungrasi n. lemongrass plant.
struntyi n. sty (eye inflammation).
stuka 1) v. study. 2) n. course of study.
stupu n. steps, raised walkway.
sturu 1) n. chair, seat. 2) n. seat in parliament.
sukru 1) n. sugar. 2) adj. sweet. 3) v. sweeten. 4) adj. sociable, fun. 5) n. diabetes.
sukrubakba n. sweet banana variety.
sukrub'bu n. bubble in sand after rain.
sukru-erki n. coconut-peanut-sugar sweet.
sukrukandra n. sugar cube, candy.
sukrumira n. pharaoh ant.
sukrumoisi n. sprinkles, small cake candies.
sukrupatu n. sugarbowl.
sukrusani n. candy, sweets.
sukrusiki n. diabetes.
sukruskrati n. sweetened chocolate.
suku 1) v. seek, look for. 2) v. flirt with, chase after.
diki suku investigate thoroughly.
suku mofo be offensive / provoke.
sula n. river rapid, waterfall.
suma 1) prn. who. 2) prn. whom.
sungu 1) v. sink, flood. 2) v. be flooded, underwater. 3) v. drown.
sunsaka n. soursop fruit.
supu n. soup.
supuwiwiri n. celery.
susu n. shoe, pair of shoes.
sutu1 1) v. shoot firearm. 2) v. shoot off fireworks.
sutu2 v. explode, blow out.
sutu3 1) v. push or stick into closed space. 2) v. bite, prick.
sutu faya gi incite, egg on crowd.
sutu wan finga go na loktu raise one's hand.
sutusutu v. prod, jab repeatedly.
swa 1) adj. sour. 2) v. make sour, turn sour.
swa en fesi scowl.
swagri n. brother-in-law.
swai v. swing, wave.
swaki 1) adj. weak. 2) n. weakness.
swakifasi n. weakness.
swakisei n. weak spot.
swakiman n. weak one.
swampu n. swamp, marsh.
swamputodo n. Suriname toad, pipa toad.
swarfudosu n. matchbox.
swarfutiki n. matchstick.
swarfu n. match.
swari v. swallow.
swasani n. pickled fruits in vinegar.
swen v. swim.
swenman n. swimmer.
sweri1 1) v. swear an oath. 2) n. oath.
sweri2 1) v. swell, rise. 2) n. lump, swelling. 3) adj. swollen.
sweti 1) n. sweat. 2) v. sweat. 3) v. make an effort, exert oneself.
swipi n. parrot snake.
swit'bonki n. monkeypod tree / edible pod fruit.
switi 1) adj. delicious, tasty, pleasant. 2) adj. pleasant, nice. 3) n. delicious flavor. 4) adv. fun, happy, easy.
switismeri n. perfume, incense.
swit'kasaba n. sweet cassava.
swit'patata n. sweet potato.
syabisyabi adj. shabby, slovenly.
syant n. sergeant.
syatu 1) adj. short, shallow. 2) v. shorten.
syatu pasi take a shortcut.
syen 1) n. shame, disgrace, embarrassment. 2) adj. shameful, scandalous. 3) v. feel ashamed. 4) v. be shy.
kon na syen be brought to shame.
syensyen v. be shy or bashful.
syinsyart n. slingshot, catapult.
syobu v. shove, push, jab.
syobusyobu v. repeatedly push or shove.
syoro n. shore, bank of river.
syòt n. shot of alcohol.
syow1 v. haul, carry heavy load.
syow2 n. show, spectacle.
syowman n. porter, carrier of loads.
syurkoro n. sauerkraut.
syuru adj. loose, easily pulled out or apart.


tabaka n. tobacco.
tabiki n. island in a river.
tafra 1) n. table. 2) n. feast, table spread with food.
tai1 1) v. tie, tighten, secure. 2) v. be fastened, tied.
tai2 adj. tough, hard to chew. FROM NL: taai.
taigi v. tell someone something.
taitai 1) n. bundle of items tied in cloth. 2) n. things, belongings.
tak' conj. that (short for taki2).
taki1 1) v. talk, say, speak. 2) n. manner of speaking, accent.
hari taki backtalk, argue.
puru taki words coming out of mouth.
taki baka repeat.
wani taki mean.
taki2 conj. that (Den taki taki den o kon).
taki3 1) n. branch of a tree. 2) n. twig, sprig.
taki leti tell the truth.
taki mofo say a prayer (Winti).
taki odi greet, say hello.
taki tangi thank, give thanks.
taki wan mofo say one's piece.
takiman n. spokesman, speaker.
Takitaki n. name given to Sranan Tongo (pejorative).
takru 1) adj. bad, evil, mean. 2) adj. ugly. ANT: bun; moi.
takru-ati adj. evil, wicked.
takrudu n. evil deeds, wickedness.
takrufasi n. wickedness, meanness.
takruman n. evil person.
takrusani n. evil spirit, demon, ghost.
takruyeye n. evil spirit, demon.
tak'taki 1) v. chatter, talk. 2) n. chatter, idle talk.
tamalen n. tamarind.
tamanuwa n. giant anteater.
tamara n. tomorrow.
tra tamara day after tomorrow.
tan1 1) v. stay, remain. 2) v. live, reside. 3) v. stay at lodging. 4) v. keep on, continue.
tan abra remain, be left over.
Tan bun! Have a good day! (farewell).
tan na baka remain behind.
tan2 interj. used to express surprise.
tan aka repeat a grade in school.
tan na ai stay awake.
tan poko fail a grade in school.
tan sidon fail a grade in school.
tan tiri be quiet, stay still.
tanga n. tongs, pliers.
tangi n. thanks, thankfulness.
taki tangi v. thank, give thanks.
tangitangi adv. please (beseeching).
tanpresi n. residence, place to stay.
tanta 1) n. aunt. 2) n. big fat lady.
tanteri v. persecute, torment, provoke.
tap'ai-wiwiri n. eyebrow.
tap'bere pikin last child of a mother.
tap'futu n. instep, top of foot.
tap'sei 1) adv. upper part, top part. 2) n. upriver, interior of Suriname.
tapu1 1) v. close, lock, shut. 2) adj. closed, locked. 3) v. cover. 4) v. sterilize, neuter, spay.
naki tapu slam shut.
wai tapu blow closed.
tapu2 1) v. delay, hold up. 2) v. stop, end. 3) v. stop, hold back, restrain. 4) n. protective amulet, fetish (Winti).
tapu bro die.
tapu pasi block, obstruct.
tapu skreki threaten, instill fear.
tapu wan sma mofo shut someone up.
tapu3 prep. on, above, on top of.
tapun n. cover, lid.
tara 1) n. tar. 2) v. cover with tar. 3) adj. sticky.
taratara 1) adj. sticky, gummy. 2) v. make sticky.
Tata title. father, ancestor; God (Wi Tata na heimel).
taya n. edible tuber species with large leaves (Xanthosoma).
tayawiwiri n. large green edible leaves of taya plant (tayerblad).
te1 1) conj. when (present/future). 2) conj. until. 3) prep. until, at.
te leki until, up to.
te2 n. tea.
têgo adj. eternal, everlasting.
fu têgo forever.
teki 1) v. take. 2) v. choose, pick, elect.
go teki pick up, fetch.
teki abra 1) v. take over. 2) v. conquer.
teki dia futu flee, run away fast.
teki dopu be baptized.
teki faya catch on fire.
teki na ati take to heart.
teki pasi leave, depart.
teki prati participate.
teki refrensi take revenge.
teki skoro go to school.
teki wan besroiti make a decision.
teki wan koiri take a walk.
teki waran warm oneself up.
telo n. fried cassava snack.
temre 1) v. construct out of wood. 2) v. hammer, pound on wood.
temreman1 n. carpenter.
temreman2 n. woodpecker bird.
ten n. time.
ala ten always, every time.
iniwan ten whenever, at any time.
wan ten sometime.
tenti n. temporary shelter/canopy made of poles and tarpaulin.
-tenti suffix. tens suffix (20=tutenti, 30=dritenti, 40=fotenti, 50=feifitenti, 60=siksitenti, 70=seibitenti, 80=aititenti, 90=neigitenti).
tepatu n. teapot.
teptep n. wooden-soled sandal. SYN: klompu.
tere n. tail; consequences (abi tere = have strings attached).
pisi na en tere scold severely.
teri 1) v. count, count out. 2) v. pertain to, matter. 3) v. respect, honor, hold in esteem.
teri luku v. calculate, check math.
tesi1 1) v. taste. 2) n. taste, flavor.
tesi2 1) n. trial, test, temptation. 2) v. tempt, test.
poti na tesi put to the test.
tide n. today.
tide aiti dei a week from today.
tide neti tonight.
tifi 1) n. tooth, molar. 2) n. dentures.
broko tifi broken tooth.
kaw tifi gnash teeth / put in place.
piri tifi smile / bare teeth.
pori tifi rotten tooth.
tifi-ati n. toothache.
tifidatra n. dentist.
tigri1 1) n. jaguar. 2) n. puma, cougar.
tigri2 v. tickle.
tiki 1) n. stick. 2) v. beat with a stick.
tikotiko n. hiccups.
tin num. ten.
di fu tin adj. tenth.
tinadri num. thirteen.
tingatinga v. plod along, walk slowly with difficulty.
tingi 1) v. stink, stink up. 2) n. foul odor, stench. 3) adj. stinky, smelly.
tingifowru n. vulture.
tinkoko n. stilts.
tin-na-aiti num. eighteen.
tin-na-dri num. thirteen.
tin-na-feifi num. fifteen.
tin-na-fo num. fourteen.
tin-na-neigi num. nineteen.
tin-na-seibi num. seventeen.
tin-na-siksi num. sixteen.
tiri1 1) adv. quietly, silently. 2) adj. quiet, calm.
tan tiri be quiet, stay still.
tiri2 1) v. govern, rule, lead. 2) n. authority, rule, control.
tiriman n. leader, ruler.
titei 1) n. rope, string. 2) n. liana, vine. 3) n. muscle, tendon. 4) n. blood vessel. 5) v. beat someone in a contest/fight.
hari neki titei yell at someone.
titei dyompo pull a muscle/tendon.
tnapu v. stand, stand upright. ANT: sidon.
opo tnapu stand up.
tobo n. tub.
todo n. frog, toad. SYN: dyompometi.
todobere n. tadpole.
tododyaki n. paradoxical frog.
todoprasoro n. toadstool, mushroom.
tòf 1) adj. mean, tough. 2) adj. brave, tough. 3) adj. difficult.
tofru v. conjure, do magic.
tofruman n. magician, wizard.
tofruwroko n. magic. SYN: wisi.
toke n. guinea fowl.
toko n. trouble, quarrel, row. SYN: trobi.
psa wan toko get into a fight.
tokotoko 1) n. mud, clay. 2) adj. muddy. 3) v. make muddy, spread mud.
toku adv. still, yet, nevertheless. FROM NL: toch.
toli n. penis. SYN: pipi; toitoi.
tomati n. tomato.
tomtikitiki n. tomato plant.
tompu n. tree stump.
tonbangi n. display counter in shop.
tongo 1) n. tongue. 2) n. language. 3) v. French kiss.
gi tongo cry loudly.
naki en tongo smack one's lips.
tonki n. top (toy).
tonton1 n. plantain dumpling.
tonton2 n. brains (edetonton).
tori 1) n. story, tale. 2) n. situation, issue, matter. 3) v. betray.
gi tori tell stories / put in place.
koti wan tori put an end to a situation.
toriman n. informer, traitor.
tra 1) adj. other. 2) adj. next.
wan tra another.
tra dei recently, the other day.
tra esde day before yesterday.
tra fasi in another way, differently.
tra leisi next time.
tra sei other side.
tra tamara day after tomorrow.
tra wiki next week.
tra yari next year.
tranga 1) adj. strong, well-built. 2) adj. hard, tough. 3) adj. difficult, unpleasant. 4) adv. fast, with force. 5) adv. firmly, tightly. 6) adv. loudly. 7) v. harden.
trangabaka n. birdsnake.
trangabere n. constipation.
tranga-ede adj. stubborn, obstinate. SYN: trangayesi.
trangatranga 1) adj. firm (not completely soft). 2) adv. earnestly, intensely, sternly.
trangayesi 1) adj. stubborn, disobedient. 2) n. disobedience, stubbornness.
tranga yesi v. refuse to listen, turn a deaf ear.
trap'trapu 1) v. trample on. 2) adj. trampled on.
trapu1 1) n. stairs, ladder. 2) v. step or stomp on something.
trapu psa step on someone's feet in passing.
trapu2 n. trap.
trarki n. trellis, latticework.
sidon baka trarki be in jail.
tratra adj. variety of other things.
trawan prn. the other one, next one.
trefu n. taboo.
tri n. small dried and salted fish.
triki1 n. trick, prank.
triki2 v. iron clothes. SYN: grati.
triki-isri n. clothes iron.
trikiplanga n. ironing board.
tringi v. string together (beads).
trobi 1) n. trouble, quarrel, feud. 2) v. bother, annoy.
koti wan trobi mediate a problem.
meki trobi make trouble, quarrel.
no abi trobi have no objection, makes no difference.
no abi trobi nanga don't care.
trobiman n. troublemaker.
tromu 1) n. metal canister, tin box. 2) n. lunch box.
tron1 v. become. SYN: kon.
tron2 n. repetition, time(s). SYN: leisi2.
trotro n. great-great grandparent.
trow 1) v. marry, wed. 2) n. marriage, wedding. 3) adj. married.
broko trow divorce.
trowdei n. wedding day.
trowe v. throw away.
trowe bere miscarry. SYN: lasi bere.
trowfesa n. wedding party/reception.
trowfrow n. wife. SYN: wefi.
trowkrosi n. wedding clothes.
trowkuku n. wedding cake.
trowlibi n. marriage, married life.
trowmasra n. bridegroom.
trowmisi n. bride.
trow-oso n. wedding.
trowstu 1) v. comfort, console. 2) n. comfort, consolation.
trow-uma n. wife, married woman.
tru 1) adj. true, correct. 2) n. truth.
fu tru truly.
tru sani truth.
trusu 1) v. thrust, push into closed area. 2) v. push, drive.
trutru 1) adj. genuine, real. 2) adv. truly, certainly.
tu1 num. two.
ala tu both.
di fu tu adj. second.
tu2 adv. too, also, as well.
tudewroko n. Tuesday (2nd workday).
tu-ede sneki n. worm lizard.
tuka v. meet someone/something, run into. SYN: miti1.
tuma v. punch, hit. SYN: naki.
tumofo gon 1) n. double-barrel shotgun. 2) n. person who speaks with forked tongue.
tumsi adv. excessively, too much, very. VARIANT: tumusi.
tutenti num. twenty. SYN: twenti.
tutu 1) v. horn of animal. 2) n. musical horn, trumpet. 3) n. car horn.
twarfu num. twelve.
twatwa n. large-billed seed-finch songbird.
twenti num. twenty.
tyapu 1) n. hoe. 2) v. use a hoe.
tyari 1) v. carry, transport. 2) v. bear, endure, stand.
tyari go take.
tyari gwe take away.
tyari kon bring.
tyari kon baka return something.
tyari fatu be fun to be around.
tyari go lasi waste, squander.
tyari kon na krin bring to light, reveal.
tyari kon na tesi put to the test.
tyari nen bear name / be scapegoat.
tyari powa be strong.
tyari wan pai bring an offering.
tyari yari carry age well.
tyawa 1) n. quarter, 25-cent coin. 2) n. 25 dollars/guilders.
tye interj. expression of sympathy.
tye pôti poor thing! Too bad!
tyen n. sugarcane.
tyepi 1) n. nick, notch, chip. 2) v. nick, chip. 3) adj. crazy, insane.
tyerfi v. cut a notch in something.
tyityi v. pull, drag, snatch. SYN: kiki.
tyok-mi-nek 1) adj. buttoned to neck. 2) n. turtleneck shirt/blouse.
tyokro v. choke, strangle. SYN: yokro; yoko.
tyopu v. peck, pick at.
tyotyofowru n. house wren. SYN: gadofowru.
tyuku n. bribe. SYN: bakafinga1.
tyukutyuku v. rinse one's mouth.
tyuri n. sucking sound of scorn/disapproval (sucking teeth).

udu 1) n. wood, lumber. 2) adj. wooden.
udubaki n. wooden tray.
poti na udubaki make something public, broadcast.
udubangi n. wooden bench.
udubari n. wooden barrel.
uduloso 1) n. termite. 2) n. drywood termite.
uku1 n. corner, angle.
uku2 1) n. fishing pole with line and hooks. 2) v. fish with a pole.
ukutifi n. eyetooth, canine tooth. SYN: aitifi.
ukutiki n. fishing pole.
uma 1) n. woman. 2) n. wife.
umapikin 1) n. girl. 2) n. daughter. CPART: manpikin.
umasma 1) n. woman. 2) adj. female, women's.
un prn. 2nd person plural / 1st person plural (short for unu).
unsrefi 1) refl.prn. yourselves. 2) refl.prn. ourselves. SYN: wisrefi.
unu 1) prn. 2nd person plural (you, your). 2) prn. 1st person plural (we, us, our).

wagi 1) n. wagon, cart. 2) n. car, automobile. SYN: oto.
wagiman n. porter at market/airport.
wai1 1) v. blow (breeze/wind). 2) v. wave hand. 3) v. winnow peanuts/grain. 4) v. cut grass with machete. 5) v. go away (fever/pain).
wai opo blow open.
wai tapu blow closed.
waiwai1 adj. feel dizzy or light-headed.
waiwai2 n. hand fan.
waka 1) v. walk, travel. 2) v. progress, happen. 3) v. hang around with. 4) v. cheat on a spouse.
go na waka take a trip, go on journey.
Waka bun! Have a good trip! Farewell!
waka lontu walk around.
waka psa walk by, walk past.
wakago n. little chachalaca bird.
wakaman n. young man hanging out on street, tramp.
wakawaka 1) v. walk about, wander. 2) v. live promiscuously. 3) adj. promiscuous.
wakti 1) v. wait, await. 2) n. watch, shift.
ori wakti keep watch.
waktiman n. watchman, guard.
wan1 1) num. one. 2) adj. only, one. 3) adj. same. 4) adv. about, approximately.
wan2 art. singular indefinite article (a, an).
wan3 prn. one (following an adjective: den bron wan).
-wan suffix. person suffix (breniwan, pôtiwan).
wan dei once, sometime, one day.
wan leisi sometime, once.
wan lo adj. a lot, lots, many.
wan presi somewhere.
wan sani something.
wan ten sometime.
wan tra another.
wan wan adv. one at a time. SYN: wan fru wan.
wana n. red louro wood/lumber.
wani 1) v. want. 2) aux.v. want to. 3) n. will, desire.
wani taki mean.
wantewante adv. right away, right now, at once. SYN: wantron.
wanti conj. because. FROM NL: want.
wantron adv. immediately, at once, right away. SYN: wantewante.
wantron so suddenly, all at once.
wantu num. some, a few.
wanwan adj. very few.
waran 1) adj. warm. 2) v. warm up, heat food.
No waran! Don't worry!
teki waran warm oneself up.
waranfaya v. get along with someone.
waranfisi n. smoked fish.
warawrafru n. red-and-green macaw.
warimbo n. reed used for weaving mats/baskets.
warskow 1) v. warn. 2) n. warning.
warti 1) n. value, worth. 2) adj. worthy, deserving.
was'baki n. washbasin, sink.
was'beki n. large tub for bathing/washing.
was'duku n. washcloth.
was'frow n. washerwoman, laundress.
wasi 1) v. wash dishes/clothes. 2) v. bathe, take a bath. 3) v. bathe with herbs (spiritual).
was' go cuss out, chew out. SYN: kosi1.
wasi dede wash a corpse before burial.
wasi mofo brush teeth.
was'krosi n. clean laundry.
was'oso n. bathroom, bath house.
was'uma n. washboard. SYN: grumagruma.
waswasi n. wasp, bee.
watra 1) n. water. 2) adj. watery, thin. 3) n. water bill. 4) adj. newborn (baby).
hari watra 1) grow. 2) dry out a little.
lon watra give off liquid.
sopo watra soapy water.
wasi wan watra bathe with herbs.
watra kiri be thirsty (Watra e kiri mi).
watra-agu n. capybara, water pig. SYN: kapuwa.
watra-ai n. tears.
watra-alata n. yapok, water opossum.
watra-awari n. yapok, water opossum.
watrabaki n. rain barrel, water container.
watragowtu n. placer gold found in creeks.
watrakaw n. water buffalo.
watramama n. mermaid, water spirit.
watramofo n. saliva (mi kisi watramofo = my mouth waters).
watramun n. watermelon.
watrapikin n. newborn baby (up to 6 weeks).
watrasei n. riverside, riverbank, waterfront.
wawan adv. alone, only (Na mi wawan kon = I came alone).
waya1 v. blow away.
we interj. well, hey (sentence introducer).
wefi n. wife, spouse. SYN: trowfrow.
wegi 1) n. scale. 2) n. weight. 3) v. weigh.
wegi go wegi kon consider, weigh options.
wei 1) n. pasture, field. 2) v. take livestock to pasture.
weigri v. refuse. FROM NL: weigeren.
weisipikin n. orphan.
weisi-oso n. orphanage.
wenkri n. store, shop.
wenkriman n. storekeeper, shopkeeper.
wenweni v. jiggle open, loosen by moving back and forth.
wer'ede 1) n. nuisance. 2) adj. annoying. SYN: ferferi.
weri1 v. put on, wear dress/clothes. FROM ENG: wear.
weri2 1) adj. tired, weary. 2) v. bother.
no kon nanga wan weri don't think further about something.
weri ede 1) be a nuisance. 2) worry, be concerned.
weri skin 1) make tired. 2) fatigue.
wèt n. law, government decree.
naki wan wèt enact a law.
weti 1) adj. white. 2) n. cocaine (slang).
wetiman n. white person. SYN: bakra.
wi prn. 1st person plural (we, us, our).
wiki1 n. week.
tra wiki next week.
a wiki di psa last week.
wiki2 1) adj. awake. 2) vi. awaken, wake up. 3) vt. wake someone up.
win n. wine.
wini 1) v. to win. 2) v. defeat, conquer. 3) n. profit.
winiman n. victor, champion, winner.
winsi1 1) n. wish. 2) v. wish, hope.
winsi2 conj. although, even if (awinsi).
winti1 1) n. wind. 2) n. air.
winti2 n. spirit, deity in Afro-Surinamese religion.
kisi wan winti become possessed by a spirit.
wintidansi n. frenzied ritual dance in Winti.
wintiprei n. Winti spirit ritual ceremony.
wipi 1) v. whip, spank. 2) n. whip, switch.
wisi 1) n. black magic. 2) n. black magic fetish/curse. 3) v. put a spell or curse on someone.
wisiman n. witch doctor, person doing black magic.
wisrefi refl.prn. ourselves. SYN: unsrefi.
wiswasi adj. good-for-nothing, trashy.
wiwiri 1) n. hair on head. 2) n. feather. 3) n. leaves, herbs, green vegetables.
grati wiwiri straight hair.
krusu wiwiri kinky hair. SYN: tranga wiwiri.
safu wiwiri moderately curly hair.
wiwiri-watra n. herbal bath.
wolku n. cloud.
wondru n. miracle, wonder.
woron n. worm, caterpillar, larva.
wortu 1) n. word. 2) n. speech. 3) n. message.
wortubuku n. dictionary.
wowoyo n. open-air market.
bakawowoyo backside of central market.
bigiwowoyo central market in Paramaribo.
edewowoyo front part of central market.
mofo wowoyo area in front of market.
wrifi v. rub, rub in. SYN: lobi2. FROM NL: wrijven.
wrif'wrifi v. rub over and over again.
wroko 1) v. work. 2) v. process, work on. 3) n. work, labor. 4) n. job site, workplace. 5) n. occupation, career.
wroko skin work very hard, overwork.
wroko wan sma curse someone using magic.
wroko gowtu mine gold.
wroko moni earn money.
wrokobasi n. employer.
wrokobere n. diarrhea. SYN: brokobere; lus'bere.
wrokodei n. workday.
wrokokrosi n. work clothes.
wrokoman n. worker, employee, laborer.
wrokomati n. work colleague.
wrokope n. workplace, business.
wrokosani 1) n. tool, instrument. 2) n. ingredient for recipe.
wunwun1 n. hum, buzz of insects.
wunwun2 n. large carpenter bee.

yagi v. chase away.
noti no yagi be unsuccessful, come back empty-handed.
Yampaneisi 1) n. Javanese person (descendant of contract workers). 2) adj. Javanese.
yamsi n. yam tuber. SYN: nyamsi.
yanda adv. there, over there, yonder.
yapon n. dress.
yapyapi n. general term for monkeys. SYN: keskesi.
yari1 1) n. year. 2) n. New Year's Eve/Day. 3) n. New Year's gift to customers.
de tapu yari be old, elderly.
tra yari next year.
tyari yari carry one's age well.
yari2 n. ell length measure (69 cm).
yarsin n. curtain, window shade. SYN: garden.
Yaw n. ritual name for a man born on Thursday.
yayo v. be promiscuous.
yayo-uma n. promiscuous woman, whore. SYN: motyo; huru.
yepi 1) v. help, assist, support, save. 2) n. help, assistance.
yepi wan anu lend a hand.
yere1 1) v. hear, listen. 2) v. answer a prayer.
yere skin heavy, hard work.
yèrè interj. sentence tag (okay?, ya hear!).
yere skin annoying, pain in neck.
yes'ati n. earache, ear infection.
yesi n. ear.
gi yesi listen, pay attention.
kaka yesi pay attention, listen carefully.
yesibuba n. earlobe.
yesidoti n. earwax.
yesilinga n. earring.
yeye 1) n. spirit. 2) n. personal spirit, soul.
yeyefasi adv. spiritually.
yoisti adj. correct, right. SYN: leti3; soifri.
yoko v. choke, strangle (tyokro).
yoku v. lie (mild fib), tell a white lie.
yonguboi n. young man, boy.
yongu 1) adj. young. ANT: owru1. 2) adj. unripe, green. 3) n. young man, boy.
yongusma n. youth, young people.
yorka n. spirit of a dead person, ghost.
yorkaberi n. burial at night in all-white clothing.
yorkatafra n. ceremonial meal for deceased spirit.
yosyosi 1) n. pre-school children (ages 3-5). 2) adj. tiny, small.
yosyosi-skoro n. pre-school, kindergarten. SYN: preiskoro.
yowka n. marble (game). SYN: mormo.
yowla v. have fun, enjoy oneself. SYN: meki prisiri.
yu prn. 2nd person singular (you, your, yours).
yuru1 1) n. hour, time, o'clock.
afu yuru a short time, a few minutes.
ala yuru all the time, always.
yuru2 1) v. rent, hire. 2) v. rent out. 3) n. rent money.
yuru-oso 1) n. rental house. 2) n. rent money. SYN: osoyuru.
yuruten n. moment, point in time.
yusrefi refl.prn. yourself.

zuidsei n. south.
`;

export function generateSilDictionaryJson() {
  const lines = RAW_SIL_DICTIONARY_TEXT.split('\n').map((l) => l.trim()).filter(Boolean);
  const items: RAGCorpusItem[] = [];

  let count = 0;
  for (const line of lines) {
    count++;
    // Extract headword
    const spaceIdx = line.search(/\s/);
    if (spaceIdx === -1) continue;

    const headwordRaw = line.substring(0, spaceIdx).trim();
    const rest = line.substring(spaceIdx).trim();

    // Clean headword key
    const headword = headwordRaw.replace(/\d+$/, '');
    const id = `sil_${headwordRaw.toLowerCase().replace(/[^\w]/g, '_')}_${String(count).padStart(4, '0')}`;

    // Extract part of speech if present
    const posMatch = rest.match(/^(?:1\)|2\)|3\)|4\)|5\))?\s*(n\.|v\.|vt\.|vi\.|adj\.|adv\.|prep\.|conj\.|num\.|interj\.|prn\.|art\.|dem\.prn\.|rel\.prn\.|poss\.prn\.|refl\.prn\.|title\.|aux\.v\.)/i);
    const pos = posMatch ? posMatch[1] : '';

    const title = `Dictionary: ${headwordRaw} ${pos ? `(${pos})` : ''}`.trim();

    items.push({
      id,
      title,
      category: 'dictionary',
      srananText: line,
      translation: rest,
      tags: ['dictionary', 'sil-2007', headword.toLowerCase()],
      source: 'SIL Sranan Tongo - English Dictionary (Wilner 2007)',
      dateAdded: '2026-08-08'
    });
  }

  const outputPath = path.join(process.cwd(), 'src', 'data', 'silDictionaryCorpus.json');
  fs.writeFileSync(outputPath, JSON.stringify(items, null, 2), 'utf-8');
  console.log(`Successfully generated ${items.length} SIL Dictionary RAG items -> ${outputPath}`);
  return items;
}

generateSilDictionaryJson();

