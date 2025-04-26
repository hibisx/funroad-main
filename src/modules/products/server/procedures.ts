import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import type { Where } from "payload";
import type { Category } from "@/payload-types";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        category: z.string().nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};
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
        }
        where["category.slug"] = {
          in: [parentCategory.slug, ...subcategoriesSlugs],
        };
      }

      const data = await ctx.db.find({
        collection: "products",
        depth: 1, // Populate category and image
        where,
      });

      return data;
    }),
});
