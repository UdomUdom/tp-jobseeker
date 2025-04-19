import Elysia from "elysia";
import {
  getCompanies,
  getCompanyById,
  getCompanyByUserId,
  createCompanyByUserId,
  createCompany,
  updateCompany,
  deleteCompany,
} from "@/services/company";
import { CompanyModel } from "@/db/models/company";
import { t } from "elysia";
import { ErrorHandler, SuccessHandler } from "@/utils/Handler";

const controller = "company";

export const companyController = new Elysia({
  detail: {
    tags: [controller],
  },
}).group(controller, (app) =>
  app
    .get(`/`, async () => {
      try {
        const companies = await getCompanies();
        return SuccessHandler(companies);
      } catch (error) {
        return ErrorHandler(error);
      }
    })

    .get(`/:id`, async ({ params }) => {
      try {
        const company = await getCompanyById(params.id);
        if (!company) {
          throw new Error("Company not found");
        }
        return SuccessHandler(company);
      } catch (error) {
        return ErrorHandler(error);
      }
    })

    .post(
      `/`,
      async ({ body }) => {
        try {
          const parsedBody = CompanyModel.parse(body);
          const company = await createCompany(parsedBody);
          return SuccessHandler(company);
        } catch (error) {
          return ErrorHandler(error);
        }
      },
      {
        params: t.Object({
          id: t.String(),
        }),
        body: CompanyModel,
      }
    )

    .post(
      `/:id`,
      async ({ params, body }) => {
        try {
          const parsedBody = CompanyModel.parse(body);
          const company = await createCompanyByUserId(params.id, parsedBody);
          return SuccessHandler(company);
        } catch (error) {
          return ErrorHandler(error);
        }
      },
      {
        params: t.Object({
          id: t.String(),
        }),
        body: CompanyModel,
      }
    )

    .put(
      "/:id",
      async ({ params, body }) => {
        try {
          console.log("Incoming body:", body);
          const company = await updateCompany(params.id, body);
          if (!company) {
            throw new Error("Company not found");
          }
          return SuccessHandler(company);
        } catch (error) {
          return ErrorHandler(error);
        }
      },
      {
        params: t.Object({
          id: t.String(),
        }),
        body: CompanyModel,
      }
    )

    .delete("/:id", async ({ params }) => {
      try {
        const company = await deleteCompany(params.id);
        if (!company) {
          throw new Error("Company not found");
        }
        return SuccessHandler(company);
      } catch (error) {
        return ErrorHandler(error);
      }
    })
);
