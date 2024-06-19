/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};


const run = async (req, res) => {
    const chatSession = model.startChat({
        generationConfig,
        // safetySettings: Adjust safety settings
        // See https://ai.google.dev/gemini-api/docs/safety-settings
        history: [
            {
                role: "user",
                parts: [
                    { text: "{\nnum:5,\ntext: מזג האוויר הוא תחום עמוק שמשפיע על חיינו בצורה משמעותית. הוא משפיע לא רק על היום-יום שלנו, אלא גם על תחומים רבים כמו חקלאות, תחבורה, תיירות ואף על פעילויות ספורט.\n\nמזג האוויר נמדד בפרמטרים כמו טמפרטורה, לחות אוויר, מהירות הרוח, כמות האור שמגיעה, והמזג הכללי באזור מסוים. כל אלו משפיעים על נוחות החיים ועל בריאות האדם.\n\nמערכות התחזיות הן כלי חשוב בניהול מזג האוויר, ומבוססות על נתונים שנאספים מרחבי העולם על ידי רשתות של תחנות מדידה.\n\nהשינויים במזג האוויר נובעים ממגוון גורמים, כוללים את השינויים האקלימיים הגלובליים, תקריות במערכות המזג האקלימיות, וגורמים אנושיים כמו פריצת החממה ושימוש בדלקים גוזלים.\n\nההבנה והמודלים של מדענים עוזרים לצפייה במזג האוויר בעתיד ובניית תחזיות יותר מדויקות, אך הם עדיין נתונים לשיפורים ולטעויות.\n\nבמובן רחב יותר, מזג האוויר מהווה את חלק מהקשר הגלובלי של הפעולות האנושיות והאפקטים שלהן על סביבת החיים שבה אנו חיים.\n\n\n\n\n}" },
                    { text: "give me {num} trivia quetions from \nthe {text}" },
                ],
            },
            {
                role: "model",
                parts: [
                    { text: "Here are 5 trivia questions based on the provided text:\n\n1. **What are the five parameters used to measure weather?** \n    * (Answer: Temperature, humidity, wind speed, amount of sunlight, and overall weather conditions)\n\n2. **Which human activities are mentioned as contributing to changes in weather patterns?**\n    * (Answer: Greenhouse gas emissions and the use of fossil fuels)\n\n3. **How do weather forecasts help us manage weather conditions?**\n    * (Answer: By providing information to help us prepare for and mitigate the impacts of weather events)\n\n4. **Besides daily life, what are some other areas that weather significantly impacts?**\n    * (Answer: Agriculture, transportation, tourism, and sports)\n\n5. **What is the primary source of data for weather forecasting systems?**\n    * (Answer: Measurements collected from a network of weather stations around the world) \n" },
                ],
            },
            {
                role: "user",
                parts: [
                    { text: "please In your questions stick to the ritual" },
                    { text: "And give me 3 more possible mistakes for each question - it will be like an American test" },
                ],
            },
            {
                role: "model",
                parts: [
                    { text: "Here are 5 trivia questions with 3 possible incorrect answers each, based on the provided text:\n\n**1. What are the five parameters used to measure weather?** \n    * (a) Temperature, humidity, wind speed, amount of sunlight, and overall weather conditions \n    * (b) Temperature, humidity, wind speed, precipitation, and air pressure\n    * (c) Temperature, humidity, wind speed, cloud cover, and visibility\n    * (d) Temperature, humidity, wind speed,  sun angle, and atmospheric pressure \n\n**2. Which human activities are mentioned as contributing to changes in weather patterns?**\n    * (a) Greenhouse gas emissions and the use of fossil fuels \n    * (b) Deforestation and urbanization\n    * (c)  Industrial pollution and agriculture \n    * (d) All of the above \n\n**3. How do weather forecasts help us manage weather conditions?**\n    * (a) By providing information to help us prepare for and mitigate the impacts of weather events\n    * (b) By predicting the exact time and location of weather events \n    * (c) By controlling weather patterns \n    * (d) By providing entertainment for weather enthusiasts \n\n**4. Besides daily life, what are some other areas that weather significantly impacts?**\n    * (a) Agriculture, transportation, tourism, and sports\n    * (b) Finance, education, and politics\n    * (c)  Fashion, entertainment, and technology\n    * (d) Health, safety, and energy production \n\n**5. What is the primary source of data for weather forecasting systems?**\n    * (a) Measurements collected from a network of weather stations around the world\n    * (b) Satellite imagery and radar data\n    * (c) Computer models and simulations\n    * (d) Observations from meteorologists and weather enthusiasts \n" },
                ],
            },
            {
                role: "user",
                parts: [
                    { text: "show me which question is the coorect one\n" },
                ],
            },
            {
                role: "model",
                parts: [
                    { text: "You're right! I apologize for the error in my previous response. I should have been more careful.  \n\nThe correct answers are:\n\n1. **(a) Temperature, humidity, wind speed, amount of sunlight, and overall weather conditions** \n\n2. **(d) All of the above**\n\n3. **(a) By providing information to help us prepare for and mitigate the impacts of weather events**\n\n4. **(a) Agriculture, transportation, tourism, and sports**\n\n5. **(a) Measurements collected from a network of weather stations around the world**\n\nI'm still under development and learning to be more accurate. Thank you for pointing out my mistake! \n" },
                ],
            },
            {
                role: "user",
                parts: [
                    { text: "give me the qustions toogether with  all\n" },
                ],
            },
            {
                role: "model",
                parts: [
                    { text: "Here are the trivia questions with all the possible answers, including the correct ones:\n\n**1. What are the five parameters used to measure weather?** \n    * (a) Temperature, humidity, wind speed, amount of sunlight, and overall weather conditions  **[CORRECT]**\n    * (b) Temperature, humidity, wind speed, precipitation, and air pressure\n    * (c) Temperature, humidity, wind speed, cloud cover, and visibility\n    * (d) Temperature, humidity, wind speed,  sun angle, and atmospheric pressure \n\n**2. Which human activities are mentioned as contributing to changes in weather patterns?**\n    * (a) Greenhouse gas emissions and the use of fossil fuels \n    * (b) Deforestation and urbanization\n    * (c)  Industrial pollution and agriculture \n    * (d) All of the above  **[CORRECT]**\n\n**3. How do weather forecasts help us manage weather conditions?**\n    * (a) By providing information to help us prepare for and mitigate the impacts of weather events  **[CORRECT]**\n    * (b) By predicting the exact time and location of weather events \n    * (c) By controlling weather patterns \n    * (d) By providing entertainment for weather enthusiasts \n\n**4. Besides daily life, what are some other areas that weather significantly impacts?**\n    * (a) Agriculture, transportation, tourism, and sports  **[CORRECT]**\n    * (b) Finance, education, and politics\n    * (c)  Fashion, entertainment, and technology\n    * (d) Health, safety, and energy production \n\n**5. What is the primary source of data for weather forecasting systems?**\n    * (a) Measurements collected from a network of weather stations around the world  **[CORRECT]**\n    * (b) Satellite imagery and radar data\n    * (c) Computer models and simulations\n    * (d) Observations from meteorologists and weather enthusiasts \n" },
                ],
            },
            {
                role: "user",
                parts: [
                    { text: "{num:2,text:כנות שבבים הוא תחום מרתק שבו מתכנתים מפתחים קוד עבור מערכות מורכבות ביותר שמשתמשות בשבבים מובנים. תכנות זה משתמש בשפות תכנות ובכלים מתקדמים לפיתוח תוכנה שמריצה את הפונקציות הרצויות על גבי השבב.\n\nשבב הוא קומפוננטה אלקטרונית מיניאטורית המכילה מעגלים משולבים בעלי יכולת פעולה ספציפית. התכנות שבבים כולל יכולות כמו תקשורת, עיבוד נתונים, בקרת זרימה, ניהול צריכת חשמל, ועוד, וכל זאת בתוך מרחב קטן מאוד.\n\nלתכנות שבבים יש יישומים מגוונים כמו בתחומי הטלקומוניקציה, בקרת התנעה ובמערכות בית חכם, רכב, רפואה, תעשייה ועוד. הם מצוידים במעבדים, זיכרונות, מתגים ומעגלים נוספים המספקים את היכולות הנדרשות לביצוע הפונקציות המבוקשות.\n\nתכנות שבבים דורש ידע מעמיק בסיסי כמו כישורים באלגוריתמיקה, יכולות פיתוח תוכנה וידע במקורות פיזיים ואלקטרוניים של השבבים. היכולת לשלב את התכנות הכללי עם הידע הספציפי על השבב מאפשרת למפתחים ליצור מערכות מורכבות ומתקדמות ביותר לשימוש בפועל.\n\n\n\n}\n" },
                ],
            },
            {
                role: "model",
                parts: [
                    { text: "Here are 2 trivia questions based on the provided text, with 3 possible incorrect answers each: \n\n**1. What is the primary function of a \"chip\" in the context of embedded systems programming?**\n\n* (a)  A chip is a small component that houses interconnected circuits designed for a specific purpose. **[CORRECT]** \n* (b) A chip is a type of software used for programming complex systems. \n* (c) A chip is a type of memory storage for large amounts of data. \n* (d) A chip is a tool used for debugging embedded systems code.\n\n**2. Which of the following is NOT a common application area for embedded systems programming?**\n\n* (a) Telecommunications  \n* (b) Entertainment and gaming **[CORRECT]**\n* (c)  Automotive \n* (d) Medical devices \n\n" },
                ],
            },
        ],
    });

    const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    console.log(result.response.text());

    if (!result) {
        return res.status(400).json({
            error: true,
            message: "No result",
            data: null
        })
    }
    res.json({
        error: false,
        message: '',
        data: result.response.text(),
    })
}
module.exports = { run };