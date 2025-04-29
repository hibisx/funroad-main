import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import type { Where, Sort } from "payload";
import type { Category } from "@/payload-types";
import { sortValues } from "../search-params";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        category: z.string().nullable().optional(),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
        tags: z.array(z.string()).nullable().optional(),
        sort: z.enum(sortValues).nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};
      let sort: Sort = "-createdAt";

      if (input.sort === "curated") {
        sort = "-curatedAt";
      }

      if (input.sort === "trending") {
        sort = "name";
      }

      if (input.sort === "hot") {
        sort = "+createdAt";
      }

      if (input.sort === "new") {
        sort = "-createdAt";
      }

      if (input.minPrice) {
        where.price = {
          ...(where.price || {}),
          greater_than_equal: input.minPrice,
        };
      }

      if (input.maxPrice) {
        where.price = {
          ...(where.price || {}),
          less_than_equal: input.maxPrice,
        };
      }

      if (input.category) {
        const categoryData = await ctx.db.find({
          collection: "categories",
          limit: 1,
          depth: 1,
          pagination: false,
          where: {
            slug: {
              equals: input.category,
            },
          },
        });

        const formattedData = categoryData.docs.map((doc) => ({
          ...doc,
          subcategories: (doc.subcategories?.docs ?? []).map((sub) => ({
            ...(sub as Category),
            subcategories: undefined,
          })),
        }));

        const subcategoriesSlugs = [];
        const parentCategory = formattedData[0];

        if (parentCategory) {
          subcategoriesSlugs.push(
            ...parentCategory.subcategories.map((sub) => sub.slug)
          );
          where["category.slug"] = {
            in: [parentCategory.slug, ...subcategoriesSlugs],
          };
        }
      }

      if (input.tags && input.tags.length > 0) {
        where["tags.name"] = {
          in: input.tags,
        };
      }

      const data = await ctx.db.find({
        collection: "products",
        depth: 1, // Populate category and image
        where,
        sort,
      });

      return data;
    }),
});
