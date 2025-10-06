import dotenv from "dotenv";
dotenv.config({path: "./.env"});
const slugify = (str) => {
  return str
    .normalize("NFD") // décompose les caractères accentués
    .replace(/[\u0300-\u036f]/g, "") // supprime les accents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-"); // fusionne les tirets multiples
};

async function contactSlugExists(slug) {
try {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/contacts/${slug}`);
  if (response.status === 200) {
    return true;
  } else if (response.status === 404) {
    return false;
  } else {
    console.error(`Unexpected response status: ${response.status}`);
    return false;
  }
} catch (error) {
  if (error.response) {
    console.error(`Error checking slug: ${error.response.status}`);
  } else {
    console.error("Error checking slug:", error.message);
  }
  return false;
}

}


export async function generateContactSlug(firstName, lastName) {
  const slugFirstName = slugify(firstName);
  const slugLastName = slugify(lastName);
  let slug = `${slugFirstName}-${slugLastName}`;

  let counter = 1;
  while (await contactSlugExists(slug)) {
    slug = `${slugFirstName}-${slugLastName}-${counter}`;
    counter++;
  }
  return slug;
}