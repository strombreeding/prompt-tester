import axios from "axios";

export const reqGetContentsByPrompt = async (id: any) => {
  const res = await axios.get(
    "https://n8n.imagineline.com/webhook/prompts/detail?id=" + id
  );

  return res.data.data;
};

export const reqAllPrompt = async (id: string) => {
  const res = await axios.get(
    "https://n8n.imagineline.com/webhook/projects/prompts?id=" + id
  );
  console.log(res.data);
  return res.data;
};
