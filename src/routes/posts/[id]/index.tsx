import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { graphqlClient } from "~/lib/graphql/client";
import { GET_POST } from "~/lib/graphql/queries";
import { formatDate } from "~/lib/utils";
