import puppeteer from "puppeteer";

import {
  getMatchIdList,
  getFixtures,
  getMatchData,
  getStatsPlayer,
  getStatsMatch,
  getPointByPoint,
  getDateMatch
} from "./utils/index.js";

(async () => {
  let country = null;
  let league = null;
  let headless = false;
  let action = "results";
  let ids = null;
  let includeMatchData = true; // Default value is true
  let includeStatsPlayer = true; // Default value is true
  let includeStatsMatch = true; // Default value is true
  let includePointByPoint = true; // Default value is true
  
  process.argv?.slice(2)?.map(arg => {
    if (arg.includes("country="))
      country = arg.split("country=")?.[1] ?? country;
    if (arg.includes("league="))
      league = arg.split("league=")?.[1] ?? league;
    if (arg.includes("headless"))
      headless = true;
    if (arg.includes("path="))
      path = arg.split("path=")?.[1] ?? path;
    if (arg.includes("action="))
      action = arg.split("action=")?.[1] ?? action;
    if (arg.includes("ids="))
      ids = arg.split("ids=")?.[1]?.split(",") ?? ids;
    if (arg.includes("includeMatchData="))
      includeMatchData = arg.split("includeMatchData=")?.[1]?.toLowerCase() === "true";
    if (arg.includes("includeStatsPlayer="))
      includeStatsPlayer = arg.split("includeStatsPlayer=")?.[1]?.toLowerCase() === "true";
    if (arg.includes("includeStatsMatch="))
      includeStatsMatch = arg.split("includeStatsMatch=")?.[1]?.toLowerCase() === "true";
    if (arg.includes("includePointByPoint="))
      includePointByPoint = arg.split("includePointByPoint=")?.[1]?.toLowerCase() === "true";
  });

  let allMatchIdLists = [];

  if (action==="fixtures" && ids!==null) {
    const browser = await puppeteer.launch({ headless });
    const fecha = await getDateMatch(browser,ids.toString());
    console.log("[fechasPartidos - ",fecha + "]");
    await browser.close();
  } 

  if (action === "fixtures" && ids ===null) {
    const browser = await puppeteer.launch({ headless });
    const combinedData = await getFixtures(browser, country, league);
    await browser.close();
    console.log("[");
    console.log(allMatchIdLists.additionalContent);
    for (const combined of combinedData) {
      console.log(combined);
    }
    console.log("]");
    return combinedData;
  }
  
  if (action === "results") {
    const browser = await puppeteer.launch({ headless });
    if (ids !== null) {
      for (const id of ids) {
        console.log("ID", id);
        if (includeMatchData) {
          const matchData = await getMatchData(browser, id);
          console.log("Match Data:", matchData);
        }
        const numberOfMatches = 4; // Puedes cambiar este valor según tus necesidades

        for (let i = 1; i <= numberOfMatches; i++) {
          if (includeStatsMatch) {
            const statsMatch = await getStatsMatch(browser, id, i);
            console.log(`StatsMatch ${i}:`, statsMatch);
          }

          if (includePointByPoint) {
            const pointByPoint = await getPointByPoint(browser, id, i);
            console.log(`PointByPoint ${i}:`, pointByPoint);
          }
        }

      }
    } else {
      allMatchIdLists = await getMatchIdList(browser, country, league);
      for (const matchIdListObject of allMatchIdLists.matchIdList) {
        console.log(matchIdListObject);
      }
    }
    await browser.close();
  }
})();
