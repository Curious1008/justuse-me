import type { ToolPlugin, ToolResult } from "../types";
import TextPreview from "@/components/tool/previews/TextPreview";

const FIRST_NAMES = [
  "Alice", "Bob", "Charlie", "Diana", "Edward", "Fiona", "George", "Hannah",
  "Ivan", "Julia", "Kevin", "Laura", "Michael", "Natalie", "Oscar", "Patricia",
  "Quentin", "Rachel", "Samuel", "Tina", "Ulrich", "Vanessa", "Walter", "Xena",
  "Yusuf", "Zara", "Aaron", "Bella", "Carlos", "Daisy",
];

const LAST_NAMES = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
  "Wilson", "Anderson", "Taylor", "Thomas", "Lee", "Martin", "Thompson", "White",
  "Harris", "Clark", "Lewis", "Robinson", "Walker", "Hall", "Allen", "Young",
  "Hernandez", "King", "Wright", "Lopez", "Hill", "Scott",
];

const DOMAINS = [
  "gmail.com", "yahoo.com", "outlook.com", "icloud.com", "hotmail.com",
  "protonmail.com", "mail.com", "fastmail.com",
];

const STREETS = [
  "Maple St", "Oak Ave", "Pine Rd", "Cedar Blvd", "Elm Dr", "Birch Ln",
  "Walnut Ct", "Cherry Way", "Willow Pl", "Ash Terrace",
];

const CITIES = [
  "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia",
  "San Antonio", "San Diego", "Dallas", "Austin", "Jacksonville", "San Jose",
  "Denver", "Seattle", "Nashville", "Boston", "Portland", "Las Vegas",
];

const STATES = [
  "NY", "CA", "IL", "TX", "AZ", "PA", "FL", "OH", "GA", "NC",
  "MI", "WA", "CO", "TN", "MA", "OR", "NV", "MN",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(lo: number, hi: number): number {
  return Math.floor(Math.random() * (hi - lo + 1)) + lo;
}

function generateRecord() {
  const first = pick(FIRST_NAMES);
  const last = pick(LAST_NAMES);
  const name = `${first} ${last}`;
  const emailUser = `${first.toLowerCase()}.${last.toLowerCase()}${randInt(1, 999)}`;
  const email = `${emailUser}@${pick(DOMAINS)}`;
  const phone = `+1 (${randInt(200, 999)}) ${randInt(200, 999)}-${randInt(1000, 9999)}`;
  const street = `${randInt(1, 9999)} ${pick(STREETS)}`;
  const city = pick(CITIES);
  const state = pick(STATES);
  const zip = String(randInt(10000, 99999));
  const address = `${street}, ${city}, ${state} ${zip}`;

  return { name, email, phone, address };
}

const fakeDataGenerator: ToolPlugin = {
  id: "fake-data-generator",
  category: "generator",
  name: "Fake Data Generator",
  description: "Generate realistic fake names, emails, phone numbers, and addresses as JSON.",
  keywords: [
    "fake data",
    "dummy data",
    "test data",
    "mock data",
    "random data generator",
    "sample data",
  ],
  icon: "\u{1F9EA}",

  inputMode: "text",
  textPlaceholder: "Enter number of fake records to generate (default: 5)",
  textButtonLabel: "Generate",

  acceptedTypes: ["text/plain"],
  maxFiles: 1,
  maxFileSize: 1 * 1024 * 1024,

  runtime: "browser",
  previewUI: TextPreview,

  async process(files): Promise<ToolResult> {
    const text = (await files[0].text()).trim();

    let count = parseInt(text, 10);
    if (isNaN(count) || count < 1) count = 5;
    if (count > 500) count = 500;

    const records = Array.from({ length: count }, generateRecord);
    const json = JSON.stringify(records, null, 2);

    return {
      blob: new Blob([json], { type: "application/json" }),
      filename: "fake-data.json",
      mimeType: "application/json",
    };
  },
};

export default fakeDataGenerator;
