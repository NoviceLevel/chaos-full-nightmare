// --- From database.ts ---
const generateDummyImage = (text, bgColor = '#4A5568', textColor = '#FFFFFF') => {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="240" viewBox="0 0 200 240">
            <rect width="100%" height="100%" fill="${bgColor}" />
        </svg>
    `.trim();
    return `data:image/svg+xml;base64,${btoa(svg)}`;
};
const nameToImagePath = (name) => {
    const fileName = name.toLowerCase().replace(/ /g, '-');
    return `./cards/${fileName}.png`;
};
const cardImageColors = {
    [CardType.BASIC]: '#718096',
    [CardType.UNIQUE]: '#3182CE',
    [CardType.NEUTRAL]: '#A0AEC0',
    [CardType.MONSTER]: '#6B46C1',
    [CardType.FORBIDDEN]: '#E53E3E',
};
const createCard = (id, type, name, options = {}) => ({
    id,
    type,
    name,
    nameZh: options.nameZh || name,
    originalType: type,
    state: CardState.NONE,
    ...options,
});
const createDeckFromData = (data) => {
    return data.map(cardData => {
        const isUltimate = !!cardData.isUltimate;
        const color = isUltimate ? '#805AD5' : cardImageColors[cardData.type];
        const imageUrl = cardData.imageUrl || generateDummyImage(cardData.name, color);
        return createCard(cardData.id, cardData.type, cardData.name, {
            isUltimate: cardData.isUltimate,
            effects: cardData.effects,
            imageUrl,
            nameZh: cardData.nameZh || cardData.name,
        });
    });
};
const DEFAULT_DECK_DATA = [
    { id: 1, type: CardType.BASIC, name: 'Basic Card', nameZh: '基础卡' },
    { id: 2, type: CardType.BASIC, name: 'Basic Card', nameZh: '基础卡' },
    { id: 3, type: CardType.BASIC, name: 'Basic Card', nameZh: '基础卡' },
    { id: 4, type: CardType.UNIQUE, name: 'Unique Card', nameZh: '独特卡' },
    { id: 5, type: CardType.UNIQUE, name: 'Unique Card', nameZh: '独特卡' },
    { id: 6, type: CardType.UNIQUE, name: 'Unique Card', nameZh: '独特卡' },
    { id: 7, type: CardType.UNIQUE, name: 'Unique Card', nameZh: '独特卡' },
    { id: 8, type: CardType.UNIQUE, name: 'Ultimate Card', nameZh: '终极卡', isUltimate: true },
];
const MIKA_DECK_DATA = [
    { id: 1, type: CardType.BASIC, name: 'Water Arrow', nameZh: '水箭', imageUrl: './cards/mika-1.webp' },
    { id: 2, type: CardType.BASIC, name: 'Water Barrier', nameZh: '水之壁障', imageUrl: './cards/mika-3.webp' },
    { id: 3, type: CardType.BASIC, name: 'Water Barrier', nameZh: '水之壁障', imageUrl: './cards/mika-3.webp' },
    { id: 4, type: CardType.UNIQUE, name: 'Source of Water', nameZh: '水之源', imageUrl: './cards/mika-4.webp' },
    { id: 5, type: CardType.UNIQUE, name: 'Blessing of Waves', nameZh: '波涛祝福', imageUrl: './cards/mika-5.webp' },
    { id: 6, type: CardType.UNIQUE, name: 'Tactical Analysis', nameZh: '战术分析', imageUrl: './cards/mika-6.webp' },
    { id: 7, type: CardType.UNIQUE, name: 'Whirlpool', nameZh: '漩涡', imageUrl: './cards/mika-7.webp' },
    { id: 8, type: CardType.UNIQUE, name: 'Deluge', nameZh: '大洪水', isUltimate: true, imageUrl: './cards/mika-8.webp', effects: [CardEffect.UNIQUE] },
];
const HARU_DECK_DATA = [
    { id: 1, type: CardType.BASIC, name: 'Anchor', nameZh: '锚', imageUrl: './cards/haru-1.webp' },
    { id: 2, type: CardType.BASIC, name: 'Power Anchor', nameZh: '强力锚', imageUrl: './cards/haru-2.webp' },
    { id: 3, type: CardType.BASIC, name: 'Anchor Drop', nameZh: '锚坠', imageUrl: './cards/haru-3.webp' },
    { id: 4, type: CardType.UNIQUE, name: 'Anchor Shot', nameZh: '锚炮', imageUrl: './cards/haru-4.webp' },
    { id: 5, type: CardType.UNIQUE, name: 'Anchor Pointer', nameZh: '锚指针', imageUrl: './cards/haru-5.webp' },
    { id: 6, type: CardType.UNIQUE, name: 'Power Charge', nameZh: '力量充能', imageUrl: './cards/haru-6.webp' },
    { id: 7, type: CardType.UNIQUE, name: 'Charge Energy', nameZh: '充能', imageUrl: './cards/haru-7.webp' },
    { id: 8, type: CardType.UNIQUE, name: 'Lift Anchor', nameZh: '起锚', isUltimate: true, imageUrl: './cards/haru-8.webp' },
];
const RENOA_DECK_DATA = [
    { id: 1, type: CardType.BASIC, name: 'Annihilation Shot', nameZh: '歼灭射击', imageUrl: './cards/renoa-1.webp' },
    { id: 2, type: CardType.BASIC, name: 'Annihilation Shot', nameZh: '歼灭射击', imageUrl: './cards/renoa-1.webp' },
    { id: 3, type: CardType.BASIC, name: 'Black Veil', nameZh: '黑纱', imageUrl: './cards/renoa-3.webp' },
    { id: 4, type: CardType.UNIQUE, name: 'Echo of Sorrow', nameZh: '悲伤回响', imageUrl: './cards/renoa-4.webp' },
    { id: 5, type: CardType.UNIQUE, name: 'Instant Judgment', nameZh: '瞬间审判', imageUrl: './cards/renoa-5.webp' },
    { id: 6, type: CardType.UNIQUE, name: 'Ballad of Pitch Black', nameZh: '漆黑之歌', imageUrl: './cards/renoa-6.webp' },
    { id: 7, type: CardType.UNIQUE, name: 'Flower of Devoured Fate', nameZh: '吞噬命运之花', imageUrl: './cards/renoa-7.webp' },
    { id: 8, type: CardType.UNIQUE, name: 'Last-Ditch Assault', nameZh: '最后突击', isUltimate: true, imageUrl: './cards/renoa-8.webp' },
];
const VERONICA_DECK_DATA = [
    { id: 1, type: CardType.BASIC, name: 'Rapid Fire', nameZh: '速射', imageUrl: './cards/veronica-1.webp' },
    { id: 2, type: CardType.BASIC, name: 'Rapid Fire', nameZh: '速射', imageUrl: './cards/veronica-1.webp' },
    { id: 3, type: CardType.BASIC, name: 'Illusion of Golden Daffodils', nameZh: '金色水仙幻影', imageUrl: './cards/veronica-3.webp' },
    { id: 4, type: CardType.UNIQUE, name: 'Firing Preparation', nameZh: '射击准备', imageUrl: './cards/veronica-4.webp', effects: [CardEffect.UNIQUE] },
    { id: 5, type: CardType.UNIQUE, name: 'Repose', nameZh: '安息', imageUrl: './cards/veronica-5.webp' },
    { id: 6, type: CardType.UNIQUE, name: 'Pendant of Resolution', nameZh: '决心吊坠', imageUrl: './cards/veronica-6.webp' },
    { id: 7, type: CardType.UNIQUE, name: 'Sir Kowalski', nameZh: '科瓦尔斯基先生', imageUrl: './cards/veronica-7.webp' },
    { id: 8, type: CardType.UNIQUE, name: 'Bombardment Prep', nameZh: '炮击准备', isUltimate: true, imageUrl: './cards/veronica-8.webp' },
];
const BERYL_DECK_DATA = [
    { id: 1, type: CardType.BASIC, name: 'Launcher', nameZh: '发射器', imageUrl: './cards/beryl-1.webp' },
    { id: 2, type: CardType.BASIC, name: 'Charge Launcher', nameZh: '充能发射器', imageUrl: './cards/beryl-2.webp' },
    { id: 3, type: CardType.BASIC, name: 'Barrier', nameZh: '屏障', imageUrl: './cards/beryl-3.webp' },
    { id: 4, type: CardType.UNIQUE, name: 'Opening Found', nameZh: '发现破绽', imageUrl: './cards/beryl-4.webp' },
    { id: 5, type: CardType.UNIQUE, name: 'Charged Shot', nameZh: '充能射击', imageUrl: './cards/beryl-5.webp' },
    { id: 6, type: CardType.UNIQUE, name: 'Guilty Pleasure', nameZh: '罪恶快感', imageUrl: './cards/beryl-6.webp' },
    { id: 7, type: CardType.UNIQUE, name: 'Unlimited Firepower', nameZh: '无限火力', imageUrl: './cards/beryl-7.webp' },
    { id: 8, type: CardType.UNIQUE, name: 'Heavy Weapons Specialist', nameZh: '重武器专家', isUltimate: true, imageUrl: './cards/beryl-8.webp' },
];
const LUKE_DECK_DATA = [
    { id: 1, type: CardType.BASIC, name: 'Single Shot', nameZh: '单发射击', imageUrl: './cards/luke-1.webp' },
    { id: 2, type: CardType.BASIC, name: 'Single Shot', nameZh: '单发射击', imageUrl: './cards/luke-1.webp' },
    { id: 3, type: CardType.BASIC, name: 'Rapid Fire (Luke)', nameZh: '速射', imageUrl: './cards/luke-3.webp' },
    { id: 4, type: CardType.UNIQUE, name: 'Shadow Concealment', nameZh: '暗影隐蔽', imageUrl: './cards/luke-4.webp' },
    { id: 5, type: CardType.UNIQUE, name: 'Stealth Reload', nameZh: '隐秘装填', imageUrl: './cards/luke-5.webp' },
    { id: 6, type: CardType.UNIQUE, name: 'Seize the Opportunity', nameZh: '抓住机会', imageUrl: './cards/luke-6.webp' },
    { id: 7, type: CardType.UNIQUE, name: 'Dance of the Demon', nameZh: '恶魔之舞', imageUrl: './cards/luke-7.webp' },
    { id: 8, type: CardType.UNIQUE, name: 'Finisher Round', nameZh: '终结之弹', imageUrl: './cards/luke-8.webp', isUltimate: true, effects: [CardEffect.UNIQUE] },
];
const KHALIPE_DECK_DATA = [
    { id: 1, type: CardType.BASIC, name: 'Lashing', nameZh: '鞭打', imageUrl: './cards/khalipe-1.webp' },
    { id: 2, type: CardType.BASIC, name: 'Upward Slash', nameZh: '上挑斩', imageUrl: './cards/khalipe-2.webp' },
    { id: 3, type: CardType.BASIC, name: "Tyr's Vow", nameZh: '提尔之誓', imageUrl: './cards/khalipe-3.webp' },
    { id: 4, type: CardType.UNIQUE, name: 'Vulture Ejection', nameZh: '秃鹫弹射', imageUrl: './cards/khalipe-4.webp' },
    { id: 5, type: CardType.UNIQUE, name: 'Greatsword Aquila', nameZh: '巨剑天鹰', imageUrl: './cards/khalipe-5.webp' },
    { id: 6, type: CardType.UNIQUE, name: 'Overpower', nameZh: '压制', imageUrl: './cards/khalipe-6.webp' },
    { id: 7, type: CardType.UNIQUE, name: "Absolute Protection", nameZh: '绝对防护', imageUrl: './cards/khalipe-7.webp' },
    { id: 8, type: CardType.UNIQUE, name: 'Rally', nameZh: '集结', imageUrl: './cards/khalipe-8.webp', isUltimate: true },
];
const MAGNA_DECK_DATA = [
    { id: 1, type: CardType.BASIC, name: 'Frozen Fist', nameZh: '冰冻之拳', imageUrl: './cards/magna-1.webp' },
    { id: 2, type: CardType.BASIC, name: 'Frost Shield', nameZh: '霜冻护盾', imageUrl: './cards/magna-2.webp' },
    { id: 3, type: CardType.BASIC, name: 'Frost Shield', nameZh: '霜冻护盾', imageUrl: './cards/magna-2.webp' },
    { id: 4, type: CardType.UNIQUE, name: 'Ice Fragment', nameZh: '冰之碎片', imageUrl: './cards/magna-4.webp' },
    { id: 5, type: CardType.UNIQUE, name: 'Glacial Iron Fist', nameZh: '冰川铁拳', imageUrl: './cards/magna-5.webp' },
    { id: 6, type: CardType.UNIQUE, name: 'Ice Wall', nameZh: '冰墙', imageUrl: './cards/magna-6.webp' },
    { id: 7, type: CardType.UNIQUE, name: 'Frost Charge', nameZh: '霜冻冲锋', imageUrl: './cards/magna-7.webp' },
    { id: 8, type: CardType.UNIQUE, name: 'Storm of Bitter Cold', nameZh: '严寒风暴', imageUrl: './cards/magna-8.webp', isUltimate: true },
];
const ORLEA_DECK_DATA = [
    { id: 1, type: CardType.BASIC, name: 'Attack, My Minions', imageUrl: './cards/orlea-1.webp' },
    { id: 2, type: CardType.BASIC, name: 'Attack, My Minions', imageUrl: './cards/orlea-1.webp' },
    { id: 3, type: CardType.BASIC, name: 'Celestial Healing', imageUrl: './cards/orlea-3.webp' },
    { id: 4, type: CardType.UNIQUE, name: 'Sacred Censer', imageUrl: './cards/orlea-4.webp' },
    { id: 5, type: CardType.UNIQUE, name: 'Growth Acceleration', imageUrl: './cards/orlea-5.webp' },
    { id: 6, type: CardType.UNIQUE, name: 'Annoying', imageUrl: './cards/orlea-6.webp' },
    { id: 7, type: CardType.UNIQUE, name: 'Growing Creature', imageUrl: './cards/orlea-7.webp' },
    { id: 8, type: CardType.UNIQUE, name: 'Will of Light', imageUrl: './cards/orlea-8.webp', isUltimate: true },
];
const RIN_DECK_DATA = [
    { id: 1, type: CardType.BASIC, name: 'Dark Mist Sword: First Form', imageUrl: './cards/rin-1.webp' },
    { id: 2, type: CardType.BASIC, name: 'Dark Mist Sword: Third Form', imageUrl: './cards/rin-2.webp' },
    { id: 3, type: CardType.BASIC, name: 'Protection', imageUrl: './cards/rin-3.webp' },
    { id: 4, type: CardType.UNIQUE, name: 'Drawing Slash', imageUrl: './cards/rin-4.webp' },
    { id: 5, type: CardType.UNIQUE, name: 'Dark Mist Secret Art: Destruction', imageUrl: './cards/rin-5.webp' },
    { id: 6, type: CardType.UNIQUE, name: 'Dark Mist Secret Art: Annihilation', imageUrl: './cards/rin-6.webp' },
    { id: 7, type: CardType.UNIQUE, name: 'Dark Mist Inner Art', imageUrl: './cards/rin-7.webp' },
    { id: 8, type: CardType.UNIQUE, name: 'Dark Mist Secret Art: Black Dance', imageUrl: './cards/rin-8.webp', isUltimate: true },
];
const AMIR_DECK_DATA = [
    { id: 1, type: CardType.BASIC, name: 'Rapier', imageUrl: './cards/amir-1.webp' },
    { id: 2, type: CardType.BASIC, name: 'Rapier', imageUrl: './cards/amir-1.webp' },
    { id: 3, type: CardType.BASIC, name: 'Steel Barrier', imageUrl: './cards/amir-3.webp' },
    { id: 4, type: CardType.UNIQUE, name: 'Hovering Metal', imageUrl: './cards/amir-4.webp' },
    { id: 5, type: CardType.UNIQUE, name: 'Metal Pierce', imageUrl: './cards/amir-5.webp' },
    { id: 6, type: CardType.UNIQUE, name: 'Metal Extraction', imageUrl: './cards/amir-6.webp' },
    { id: 7, type: CardType.UNIQUE, name: 'Full Metal Hurricane', imageUrl: './cards/amir-7.webp' },
    { id: 8, type: CardType.UNIQUE, name: 'Iron Skin', imageUrl: './cards/amir-8.webp', isUltimate: true },
];
const CASSIUS_DECK_DATA = [
    { id: 1, type: CardType.BASIC, name: 'Cards', imageUrl: './cards/cassius-1.webp' },
    { id: 2, type: CardType.BASIC, name: 'Wild Card', imageUrl: './cards/cassius-2.webp' },
    { id: 3, type: CardType.BASIC, name: 'Mana Field', imageUrl: './cards/cassius-3.webp' },
    { id: 4, type: CardType.UNIQUE, name: 'Pop Eyed Popper', imageUrl: './cards/cassius-4.webp' },
    { id: 5, type: CardType.UNIQUE, name: 'Devil Dice', imageUrl: './cards/cassius-5.webp' },
    { id: 6, type: CardType.UNIQUE, name: 'Shuffle', imageUrl: './cards/cassius-6.webp' },
    { id: 7, type: CardType.UNIQUE, name: 'Dice Trick', imageUrl: './cards/cassius-7.webp' },
    { id: 8, type: CardType.UNIQUE, name: 'Joker', imageUrl: './cards/cassius-8.webp', isUltimate: true },
];
const HUGO_DECK_DATA = [
    { id: 1, type: CardType.BASIC, name: 'Throw Dagger', imageUrl: './cards/hugo-1.webp' },
    { id: 2, type: CardType.BASIC, name: 'Throw Dagger', imageUrl: './cards/hugo-1.webp' },
    { id: 3, type: CardType.BASIC, name: 'Defense System', imageUrl: './cards/hugo-3.webp' },
    { id: 4, type: CardType.UNIQUE, name: 'Hunting Instincts', imageUrl: './cards/hugo-4.webp' },
    { id: 5, type: CardType.UNIQUE, name: 'Fan of Daggers', imageUrl: './cards/hugo-5.webp' },
    { id: 6, type: CardType.UNIQUE, name: 'Quick Fix', imageUrl: './cards/hugo-6.webp' },
    { id: 7, type: CardType.UNIQUE, name: 'Dingo Howling', imageUrl: './cards/hugo-7.webp' },
    { id: 8, type: CardType.UNIQUE, name: "Fixer's Approach", imageUrl: './cards/hugo-8.webp', isUltimate: true, effects: [CardEffect.UNIQUE] },
];
const KAYRON_DECK_DATA = [
    { id: 1, type: CardType.BASIC, name: 'Futility', imageUrl: './cards/kayron-1.webp' },
    { id: 2, type: CardType.BASIC, name: 'Elimination', imageUrl: './cards/kayron-1.webp' },
    { id: 3, type: CardType.BASIC, name: 'Sphere', imageUrl: './cards/kayron-3.webp' },
    { id: 4, type: CardType.UNIQUE, name: 'Echo of Futility', imageUrl: './cards/kayron-4.webp' },
    { id: 5, type: CardType.UNIQUE, name: 'Brand of Annihiliation', imageUrl: './cards/kayron-5.webp' },
    { id: 6, type: CardType.UNIQUE, name: 'Black Hole', imageUrl: './cards/kayron-6.webp' },
    { id: 7, type: CardType.UNIQUE, name: 'Oath of Vanity', imageUrl: './cards/kayron-7.webp' },
    { id: 8, type: CardType.UNIQUE, name: 'Echoes of True Abyss', imageUrl: './cards/kayron-8.webp', isUltimate: true },
];
const LUCAS_DECK_DATA = [
    { id: 1, type: CardType.BASIC, name: 'Machine Gun', imageUrl: './cards/lucas-1.webp' },
    { id: 2, type: CardType.BASIC, name: 'Machine Gun', imageUrl: './cards/lucas-1.webp' },
    { id: 3, type: CardType.BASIC, name: 'Shielding Incendiary Bomb', imageUrl: './cards/lucas-3.webp' },
    { id: 4, type: CardType.UNIQUE, name: 'Extended Magazine', imageUrl: './cards/lucas-4.webp' },
    { id: 5, type: CardType.UNIQUE, name: 'S.S.S', imageUrl: './cards/lucas-5.webp' },
    { id: 6, type: CardType.UNIQUE, name: 'Flame Thrower', imageUrl: './cards/lucas-6.webp' },
    { id: 7, type: CardType.UNIQUE, name: 'Flashbang', imageUrl: './cards/lucas-7.webp' },
    { id: 8, type: CardType.UNIQUE, name: 'R.P.G-7', imageUrl: './cards/lucas-8.webp', isUltimate: true },
];
const MARIBELL_DECK_DATA = [
    { id: 1, type: CardType.BASIC, name: 'Shelter Kick', imageUrl: './cards/maribell-1.webp' },
    { id: 2, type: CardType.BASIC, name: 'Shelter Defense', imageUrl: './cards/maribell-2.webp' },
    { id: 3, type: CardType.BASIC, name: 'Shelter Hold', imageUrl: './cards/maribell-3.webp' },
    { id: 4, type: CardType.UNIQUE, name: 'Resolute Blitz', imageUrl: './cards/maribell-4.webp' },
    { id: 5, type: CardType.UNIQUE, name: 'Maribell Shelter MK.II', imageUrl: './cards/maribell-5.webp' },
    { id: 6, type: CardType.UNIQUE, name: "Wolves' Dome", imageUrl: './cards/maribell-6.webp' },
    { id: 7, type: CardType.UNIQUE, name: 'Oh... I see', imageUrl: './cards/maribell-7.webp' },
    { id: 8, type: CardType.UNIQUE, name: 'Shelter Strike', imageUrl: './cards/maribell-8.webp', isUltimate: true },
];
const MEILIN_DECK_DATA = [
    { id: 1, type: CardType.BASIC, name: 'Strike', imageUrl: './cards/meilin-1.webp' },
    { id: 2, type: CardType.BASIC, name: 'Strike', imageUrl: './cards/meilin-1.webp' },
    { id: 3, type: CardType.BASIC, name: 'Flame Dragon Guardian', imageUrl: './cards/meilin-3.webp' },
    { id: 4, type: CardType.UNIQUE, name: "Flame Dragon's Jewel", imageUrl: './cards/meilin-4.webp' },
    { id: 5, type: CardType.UNIQUE, name: 'Rising Dragon Spire', imageUrl: './cards/meilin-5.webp' },
    { id: 6, type: CardType.UNIQUE, name: 'Unity of Attack and Defense', imageUrl: './cards/meilin-6.webp' },
    { id: 7, type: CardType.UNIQUE, name: 'Spirit of the Aromata', imageUrl: './cards/meilin-7.webp' },
    { id: 8, type: CardType.UNIQUE, name: "Flame Dragon's Sovereignty", imageUrl: './cards/meilin-8.webp', isUltimate: true },
];
const NIA_DECK_DATA = [
    { id: 1, type: CardType.BASIC, name: 'Stroke', imageUrl: './cards/nia-1.webp' },
    { id: 2, type: CardType.BASIC, name: 'Amp Therapy', imageUrl: './cards/nia-2.webp' },
    { id: 3, type: CardType.BASIC, name: 'Amp Therapy', imageUrl: './cards/nia-2.webp' },
    { id: 4, type: CardType.UNIQUE, name: 'G Chord', imageUrl: './cards/nia-4.webp' },
    { id: 5, type: CardType.UNIQUE, name: 'Mute Accent', imageUrl: './cards/nia-5.webp' },
    { id: 6, type: CardType.UNIQUE, name: "Nia's Curiosity", imageUrl: './cards/nia-6.webp' },
    { id: 7, type: CardType.UNIQUE, name: 'Adagio', imageUrl: './cards/nia-7.webp' },
    { id: 8, type: CardType.UNIQUE, name: 'Soul Rip', imageUrl: './cards/nia-8.webp', isUltimate: true },
];
const OWEN_DECK_DATA = [
    { id: 1, type: CardType.BASIC, name: 'Downward Cut', imageUrl: './cards/owen-1.webp' },
    { id: 2, type: CardType.BASIC, name: 'Downward Cut', imageUrl: './cards/owen-1.webp' },
    { id: 3, type: CardType.BASIC, name: 'Weapon Block', imageUrl: './cards/owen-3.webp' },
    { id: 4, type: CardType.UNIQUE, name: 'Wind Charge', imageUrl: './cards/owen-4.webp' },
    { id: 5, type: CardType.UNIQUE, name: 'Wind Slash', imageUrl: './cards/owen-5.webp' },
    { id: 6, type: CardType.UNIQUE, name: 'Break Armor', imageUrl: './cards/owen-6.webp' },
    { id: 7, type: CardType.UNIQUE, name: 'Wind Riding', imageUrl: './cards/owen-7.webp' },
    { id: 8, type: CardType.UNIQUE, name: 'Gale Strike', imageUrl: './cards/owen-8.webp', isUltimate: true },
];
const REI_DECK_DATA = [
    { id: 1, type: CardType.BASIC, name: 'Dark Blade', imageUrl: './cards/rei-1.webp' },
    { id: 2, type: CardType.BASIC, name: 'Dark Blade', imageUrl: './cards/rei-1.webp' },
    { id: 3, type: CardType.BASIC, name: 'Material Regeneration', imageUrl: './cards/rei-3.webp' },
    { id: 4, type: CardType.UNIQUE, name: 'Strike of Darkness', imageUrl: './cards/rei-4.webp' },
    { id: 5, type: CardType.UNIQUE, name: 'Resonating Darkness', imageUrl: './cards/rei-5.webp' },
    { id: 6, type: CardType.UNIQUE, name: 'Snack Time', imageUrl: './cards/rei-6.webp' },
    { id: 7, type: CardType.UNIQUE, name: 'Dark Condensation', imageUrl: './cards/rei-7.webp' },
    { id: 8, type: CardType.UNIQUE, name: "Predator's Blade", imageUrl: './cards/rei-8.webp', isUltimate: true },
];
const SELENA_DECK_DATA = [
    { id: 1, type: CardType.BASIC, name: 'Engagement Fire', imageUrl: './cards/selena-1.webp' },
    { id: 2, type: CardType.BASIC, name: 'Engagement Fire', imageUrl: './cards/selena-1.webp' },
    { id: 3, type: CardType.BASIC, name: 'Emergency Shielding', imageUrl: './cards/selena-3.webp' },
    { id: 4, type: CardType.UNIQUE, name: 'High-Power Scope', imageUrl: './cards/selena-4.webp' },
    { id: 5, type: CardType.UNIQUE, name: 'Target Spotted', imageUrl: './cards/selena-5.webp' },
    { id: 6, type: CardType.UNIQUE, name: 'Drone Bombing', imageUrl: './cards/selena-6.webp' },
    { id: 7, type: CardType.UNIQUE, name: 'Tactical Maneuver', imageUrl: './cards/selena-7.webp' },
    { id: 8, type: CardType.UNIQUE, name: "Sniper's Domain", imageUrl: './cards/selena-8.webp', isUltimate: true },
];
const TRESSA_DECK_DATA = [
    { id: 1, type: CardType.BASIC, name: 'Dagger Throw', imageUrl: './cards/tressa-1.webp' },
    { id: 2, type: CardType.BASIC, name: 'Dagger Throw', imageUrl: './cards/tressa-1.webp' },
    { id: 3, type: CardType.BASIC, name: 'Touch of Darkness', imageUrl: './cards/tressa-3.webp' },
    { id: 4, type: CardType.UNIQUE, name: 'Unsheathe Dagger', imageUrl: './cards/tressa-4.webp' },
    { id: 5, type: CardType.UNIQUE, name: 'Curse', imageUrl: './cards/tressa-5.webp' },
    { id: 6, type: CardType.UNIQUE, name: 'Shadow Reload', imageUrl: './cards/tressa-6.webp' },
    { id: 7, type: CardType.UNIQUE, name: 'Vital Attack', imageUrl: './cards/tressa-7.webp' },
    { id: 8, type: CardType.UNIQUE, name: 'Cursed Gouge', imageUrl: './cards/tressa-8.webp', isUltimate: true },
];
const YUKI_DECK_DATA = [
    { id: 1, type: CardType.BASIC, name: 'Longsword Slash', imageUrl: './cards/yuki-1.webp' },
    { id: 2, type: CardType.BASIC, name: 'Rapid Cut', imageUrl: './cards/yuki-2.webp' },
    { id: 3, type: CardType.BASIC, name: 'Flowing Parry', imageUrl: './cards/yuki-3.webp' },
    { id: 4, type: CardType.UNIQUE, name: 'Prepare to Subdue', imageUrl: './cards/yuki-4.webp' },
    { id: 5, type: CardType.UNIQUE, name: 'Flash Slash', imageUrl: './cards/yuki-5.webp' },
    { id: 6, type: CardType.UNIQUE, name: 'Trickery Strike', imageUrl: './cards/yuki-6.webp' },
    { id: 7, type: CardType.UNIQUE, name: 'Freezing Blade', imageUrl: './cards/yuki-7.webp', effects: [CardEffect.UNIQUE] },
    { id: 8, type: CardType.UNIQUE, name: 'Iceberg Cleave', imageUrl: './cards/yuki-8.webp', isUltimate: true },
];
const DEFAULT_DECK = createDeckFromData(DEFAULT_DECK_DATA);
const AMIR_DECK = createDeckFromData(AMIR_DECK_DATA);
const MIKA_DECK = createDeckFromData(MIKA_DECK_DATA);
const HARU_DECK = createDeckFromData(HARU_DECK_DATA);
const RENOA_DECK = createDeckFromData(RENOA_DECK_DATA);
const VERONICA_DECK = createDeckFromData(VERONICA_DECK_DATA);
const BERYL_DECK = createDeckFromData(BERYL_DECK_DATA);
const KHALIPE_DECK = createDeckFromData(KHALIPE_DECK_DATA);
const LUKE_DECK = createDeckFromData(LUKE_DECK_DATA);
const MAGNA_DECK = createDeckFromData(MAGNA_DECK_DATA);
const ORLEA_DECK = createDeckFromData(ORLEA_DECK_DATA);
const RIN_DECK = createDeckFromData(RIN_DECK_DATA);
const CASSIUS_DECK = createDeckFromData(CASSIUS_DECK_DATA);
const HUGO_DECK = createDeckFromData(HUGO_DECK_DATA);
const KAYRON_DECK = createDeckFromData(KAYRON_DECK_DATA);
const LUCAS_DECK = createDeckFromData(LUCAS_DECK_DATA);
const MARIBELL_DECK = createDeckFromData(MARIBELL_DECK_DATA);
const MEILIN_DECK = createDeckFromData(MEILIN_DECK_DATA);
const NIA_DECK = createDeckFromData(NIA_DECK_DATA);
const OWEN_DECK = createDeckFromData(OWEN_DECK_DATA);
const REI_DECK = createDeckFromData(REI_DECK_DATA);
const SELENA_DECK = createDeckFromData(SELENA_DECK_DATA);
const TRESSA_DECK = createDeckFromData(TRESSA_DECK_DATA);
const YUKI_DECK = createDeckFromData(YUKI_DECK_DATA);
const COMBATANTS = [
    { id: 'default', name: 'Default', nameZh: '默认', deck: DEFAULT_DECK },
    { id: 'amir', name: 'Amir', nameZh: '艾美', deck: AMIR_DECK },
    { id: 'beryl', name: 'Beryl', nameZh: '百丽儿', deck: BERYL_DECK },
    { id: 'cassius', name: 'Cassius', nameZh: '凯西乌斯', deck: CASSIUS_DECK },
    { id: 'haru', name: 'Haru', nameZh: '小春', deck: HARU_DECK },
    { id: 'hugo', name: 'Hugo', nameZh: '雨果', deck: HUGO_DECK },
    { id: 'kayron', name: 'Kayron', nameZh: '凯隆', deck: KAYRON_DECK },
    { id: 'khalipe', name: 'Khalipe', nameZh: '卡利佩', deck: KHALIPE_DECK },
    { id: 'lucas', name: 'Lucas', nameZh: '卢卡斯', deck: LUCAS_DECK },
    { id: 'luke', name: 'Luke', nameZh: '路克', deck: LUKE_DECK },
    { id: 'magna', name: 'Magna', nameZh: '麦格纳', deck: MAGNA_DECK },
    { id: 'maribell', name: 'Maribell', nameZh: '玛丽贝尔', deck: MARIBELL_DECK },
    { id: 'meilin', name: 'Meilin', nameZh: '梅铃', deck: MEILIN_DECK },
    { id: 'mika', name: 'Mika', nameZh: '米卡', deck: MIKA_DECK },
    { id: 'nia', name: 'Nia', nameZh: '妮雅', deck: NIA_DECK },
    { id: 'orlea', name: 'Orlea', nameZh: '奥尔莱亚', deck: ORLEA_DECK },
    { id: 'owen', name: 'Owen', nameZh: '欧文', deck: OWEN_DECK },
    { id: 'renoa', name: 'Renoa', nameZh: '蕾欧娜', deck: RENOA_DECK },
    { id: 'rei', name: 'Rei', nameZh: '蕾伊', deck: REI_DECK },
    { id: 'rin', name: 'Rin', nameZh: '琳', deck: RIN_DECK },
    { id: 'selena', name: 'Selena', nameZh: '席琳娜', deck: SELENA_DECK },
    { id: 'tressa', name: 'Tressa', nameZh: '德蕾莎', deck: TRESSA_DECK },
    { id: 'veronica', name: 'Veronica', nameZh: '维若妮卡', deck: VERONICA_DECK },
    { id: 'yuki', name: 'Yuki', nameZh: '友纪', deck: YUKI_DECK },    
];