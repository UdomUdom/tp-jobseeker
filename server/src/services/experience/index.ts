import { eq } from "drizzle-orm";
import db from "@/db";
import * as table from "@/db/schema";
import { ExperienceType } from "@/db/models/experience";

export const getExperience = async () => {
  const experience = await db.query.experience.findMany({
    with: {
      skill: true,
    },
    columns: {
      created_at: false,
      updated_at: false,
    },
  });

  return experience;
};

export const getExperienceWithSkill = async () => {
  const experience = await db.query.experience.findMany({
    with: {
      skill: true,
    },
    columns: {
      created_at: false,
      updated_at: false,
    },
  });

  return experience;
};

export const getExperienceById = async (id: string) => {
  const experience = await db.query.experience.findFirst({
    with: {
      skill: true,
    },
    where: eq(table.experience.id, id),
    columns: {
      created_at: false,
      updated_at: false,
    },
  });

  if (!experience) throw new Error("Experience not found");

  return experience;
};

export const getExperienceByUserId = async (userId: string) => {
  const experience = await db.query.experience.findFirst({
    where: eq(table.experience.user_id, userId),
    with: {
      skill: true,
    },
    columns: {
      created_at: false,
      updated_at: false,
    },
  });

  if (!experience) throw new Error("Experience not found");

  return experience;
};

export const createExperience = async (body: ExperienceType) => {
  const newExperience = await db.insert(table.experience).values(body);

  return newExperience;
};

export const updateExperience = async (
  id: string,
  body: Partial<ExperienceType>
) => {
  const experience = await db
    .update(table.experience)
    .set(body)
    .where(eq(table.experience.id, id));

  if (!experience) throw new Error("Experience not found");

  return experience;
};

export const deleteExperience = async (id: string) => {
  const experience = await db
    .delete(table.experience)
    .where(eq(table.experience.id, id));

  if (!experience) throw new Error("Experience not found");

  return experience;
};

export const deleteExperienceByUserId = async (userId: string) => {
  const experience = await db
    .delete(table.experience)
    .where(eq(table.experience.user_id, userId));

  if (!experience) throw new Error("Experience not found");

  return experience;
};
