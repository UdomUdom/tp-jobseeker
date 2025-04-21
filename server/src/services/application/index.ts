import { eq } from "drizzle-orm";
import db from "@/db";
import * as table from "@/db/schema";
import { ApplicationType } from "@/db/models/application";

export const getApplications = async () => {
  const applications = await db.query.application.findMany({
    with: {
      job: {
        columns: {
          created_at: false,
          updated_at: false,
        },
        with: {
          company: {
            columns: {
              created_at: false,
              updated_at: false,
            },
          },
        },
      },
      user: {
        columns: {
          created_at: false,
          updated_at: false,
        },
        with: {
          seeker: {
            columns: {
              created_at: false,
              updated_at: false,
            },
            with: {
              experience: true,
              skills: true,
              education: true,
            },
          },
        },
      },
    },
    columns: {
      created_at: false,
      updated_at: false,
    },
  });
  return applications;
};

export const getApplicationsById = async (id: string) => {
  const applications = await db.query.application.findFirst({
    where: eq(table.application.id, id),
    with: {
      job: {
        columns: {
          created_at: false,
          updated_at: false,
        },
        with: {
          company: {
            columns: {
              created_at: false,
              updated_at: false,
            },
          },
        },
      },
      user: {
        columns: {
          created_at: false,
          updated_at: false,
        },
        with: {
          seeker: {
            columns: {
              created_at: false,
              updated_at: false,
            },
            with: {
              experience: true,
              skills: true,
              education: true,
            },
          },
        },
      },
    },
    columns: {
      created_at: false,
      updated_at: false,
    },
  });
  if (!applications) throw new Error("Application not found");

  return applications;
};

export const getApplicationsByUserId = async (userId: string) => {
  const applications = await db.query.application.findMany({
    where: eq(table.application.user_id, userId),
    with: {
      job: {
        columns: {
          created_at: false,
          updated_at: false,
        },
        with: {
          company: {
            columns: {
              created_at: false,
              updated_at: false,
            },
          },
        },
      },
    },
    columns: {
      created_at: false,
      updated_at: false,
    },
  });
  if (!applications || applications.length === 0)
    throw new Error("Applications not found");

  return applications;
};

export const getApplicationsByJobId = async (jobId: string) => {
  const applications = await db.query.application.findFirst({
    where: eq(table.application.job_id, jobId),
    columns: {
      created_at: false,
      updated_at: false,
    },
  });
  if (!applications) throw new Error("Application not found");

  return applications;
};

export const createApplications = async (data: ApplicationType) => {
  const applications = await db
    .insert(table.application)
    .values(data)
    .returning();
  return applications;
};

export const updateApplications = async (id: string, data: ApplicationType) => {
  const applications = await db
    .update(table.application)
    .set(data)
    .where(eq(table.application.id, id))
    .returning();
  return applications;
};

export const deleteApplications = async (id: string) => {
  const applications = await db
    .delete(table.application)
    .where(eq(table.application.id, id))
    .returning();
  return applications;
};

export const getApplicationsByStatus = async (
  status: "pending" | "accepted" | "rejected"
) => {
  const applications = await db.query.application.findFirst({
    where: eq(table.application.status, status),
    columns: {
      created_at: false,
      updated_at: false,
    },
  });
  if (!applications) throw new Error("Application not found");

  return applications;
};
