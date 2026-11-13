import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_buttons_kind" AS ENUM('link', 'phone', 'directions');
  CREATE TYPE "public"."enum_pages_blocks_hero_buttons_style" AS ENUM('copper', 'line');
  CREATE TYPE "public"."enum_pages_blocks_page_hero_buttons_kind" AS ENUM('link', 'phone', 'directions');
  CREATE TYPE "public"."enum_pages_blocks_page_hero_buttons_style" AS ENUM('copper', 'line');
  CREATE TYPE "public"."enum_pages_blocks_page_hero_variant" AS ENUM('photo', 'plain', 'sucuk');
  CREATE TYPE "public"."enum_pages_blocks_stats_background" AS ENUM('dark', 'coal2', 'light', 'cream');
  CREATE TYPE "public"."enum_pages_blocks_tiles_buttons_kind" AS ENUM('link', 'phone', 'directions');
  CREATE TYPE "public"."enum_pages_blocks_tiles_buttons_style" AS ENUM('copper', 'line');
  CREATE TYPE "public"."enum_pages_blocks_explorer_tabs_media_type" AS ENUM('image', 'panel');
  CREATE TYPE "public"."enum_pages_blocks_explorer_tabs_image_shape" AS ENUM('wide', 'portrait', 'square');
  CREATE TYPE "public"."enum_pages_blocks_explorer_tabs_panel_tone" AS ENUM('dark', 'cream');
  CREATE TYPE "public"."enum_pages_blocks_feature_buttons_kind" AS ENUM('link', 'phone', 'directions');
  CREATE TYPE "public"."enum_pages_blocks_feature_buttons_style" AS ENUM('copper', 'line');
  CREATE TYPE "public"."enum_pages_blocks_location_band_buttons_kind" AS ENUM('link', 'phone', 'directions');
  CREATE TYPE "public"."enum_pages_blocks_location_band_buttons_style" AS ENUM('copper', 'line');
  CREATE TYPE "public"."enum_pages_blocks_trust_items_icon" AS ENUM('shield', 'drop', 'truck');
  CREATE TYPE "public"."enum_pages_blocks_trust_background" AS ENUM('dark', 'coal2', 'light', 'cream');
  CREATE TYPE "public"."enum_pages_blocks_documents_background" AS ENUM('dark', 'coal2', 'light', 'cream');
  CREATE TYPE "public"."enum_pages_blocks_steps_items_media_type" AS ENUM('image', 'panel');
  CREATE TYPE "public"."enum_pages_blocks_steps_items_image_shape" AS ENUM('wide', 'portrait', 'square');
  CREATE TYPE "public"."enum_pages_blocks_steps_items_panel_tone" AS ENUM('dark', 'cream');
  CREATE TYPE "public"."enum_pages_blocks_split_image_shape" AS ENUM('wide', 'portrait', 'tall');
  CREATE TYPE "public"."enum_pages_blocks_split_background" AS ENUM('dark', 'coal2', 'light', 'cream');
  CREATE TYPE "public"."enum_pages_blocks_timeline_background" AS ENUM('dark', 'coal2', 'light', 'cream');
  CREATE TYPE "public"."enum_pages_blocks_pillars_background" AS ENUM('dark', 'coal2', 'light', 'cream');
  CREATE TYPE "public"."enum_pages_blocks_contact_background" AS ENUM('dark', 'coal2', 'light', 'cream');
  CREATE TYPE "public"."enum_pages_blocks_map_buttons_kind" AS ENUM('link', 'phone', 'directions');
  CREATE TYPE "public"."enum_pages_blocks_map_buttons_style" AS ENUM('copper', 'line');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_buttons_kind" AS ENUM('link', 'phone', 'directions');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_buttons_style" AS ENUM('copper', 'line');
  CREATE TYPE "public"."enum__pages_v_blocks_page_hero_buttons_kind" AS ENUM('link', 'phone', 'directions');
  CREATE TYPE "public"."enum__pages_v_blocks_page_hero_buttons_style" AS ENUM('copper', 'line');
  CREATE TYPE "public"."enum__pages_v_blocks_page_hero_variant" AS ENUM('photo', 'plain', 'sucuk');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_background" AS ENUM('dark', 'coal2', 'light', 'cream');
  CREATE TYPE "public"."enum__pages_v_blocks_tiles_buttons_kind" AS ENUM('link', 'phone', 'directions');
  CREATE TYPE "public"."enum__pages_v_blocks_tiles_buttons_style" AS ENUM('copper', 'line');
  CREATE TYPE "public"."enum__pages_v_blocks_explorer_tabs_media_type" AS ENUM('image', 'panel');
  CREATE TYPE "public"."enum__pages_v_blocks_explorer_tabs_image_shape" AS ENUM('wide', 'portrait', 'square');
  CREATE TYPE "public"."enum__pages_v_blocks_explorer_tabs_panel_tone" AS ENUM('dark', 'cream');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_buttons_kind" AS ENUM('link', 'phone', 'directions');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_buttons_style" AS ENUM('copper', 'line');
  CREATE TYPE "public"."enum__pages_v_blocks_location_band_buttons_kind" AS ENUM('link', 'phone', 'directions');
  CREATE TYPE "public"."enum__pages_v_blocks_location_band_buttons_style" AS ENUM('copper', 'line');
  CREATE TYPE "public"."enum__pages_v_blocks_trust_items_icon" AS ENUM('shield', 'drop', 'truck');
  CREATE TYPE "public"."enum__pages_v_blocks_trust_background" AS ENUM('dark', 'coal2', 'light', 'cream');
  CREATE TYPE "public"."enum__pages_v_blocks_documents_background" AS ENUM('dark', 'coal2', 'light', 'cream');
  CREATE TYPE "public"."enum__pages_v_blocks_steps_items_media_type" AS ENUM('image', 'panel');
  CREATE TYPE "public"."enum__pages_v_blocks_steps_items_image_shape" AS ENUM('wide', 'portrait', 'square');
  CREATE TYPE "public"."enum__pages_v_blocks_steps_items_panel_tone" AS ENUM('dark', 'cream');
  CREATE TYPE "public"."enum__pages_v_blocks_split_image_shape" AS ENUM('wide', 'portrait', 'tall');
  CREATE TYPE "public"."enum__pages_v_blocks_split_background" AS ENUM('dark', 'coal2', 'light', 'cream');
  CREATE TYPE "public"."enum__pages_v_blocks_timeline_background" AS ENUM('dark', 'coal2', 'light', 'cream');
  CREATE TYPE "public"."enum__pages_v_blocks_pillars_background" AS ENUM('dark', 'coal2', 'light', 'cream');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_background" AS ENUM('dark', 'coal2', 'light', 'cream');
  CREATE TYPE "public"."enum__pages_v_blocks_map_buttons_kind" AS ENUM('link', 'phone', 'directions');
  CREATE TYPE "public"."enum__pages_v_blocks_map_buttons_style" AS ENUM('copper', 'line');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_quote_requests_status" AS ENUM('new', 'called', 'quoted', 'closed');
  CREATE TYPE "public"."enum_users_role" AS ENUM('superadmin', 'admin', 'editor');
  CREATE TYPE "public"."enum_audit_logs_action" AS ENUM('create', 'update', 'publish', 'delete');
  CREATE TYPE "public"."enum_site_settings_cta_buttons_kind" AS ENUM('link', 'phone', 'directions');
  CREATE TYPE "public"."enum_site_settings_cta_buttons_style" AS ENUM('copper', 'line');
  CREATE TYPE "public"."enum_site_settings_not_found_buttons_kind" AS ENUM('link', 'phone', 'directions');
  CREATE TYPE "public"."enum_site_settings_not_found_buttons_style" AS ENUM('copper', 'line');
  CREATE TABLE "pages_blocks_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_pages_blocks_hero_buttons_kind" DEFAULT 'link',
  	"style" "enum_pages_blocks_hero_buttons_style" DEFAULT 'copper',
  	"arrow" boolean,
  	"label" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"is_phone" boolean
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"kicker" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"lead" varchar,
  	"scroll_label" varchar,
  	"show_seal" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_page_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_pages_blocks_page_hero_buttons_kind" DEFAULT 'link',
  	"style" "enum_pages_blocks_page_hero_buttons_style" DEFAULT 'copper',
  	"arrow" boolean,
  	"label" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_page_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_page_hero_variant" DEFAULT 'photo',
  	"image_id" integer,
  	"show_credit" boolean,
  	"crumb" varchar,
  	"title" varchar,
  	"lead" varchar,
  	"deco_word" varchar,
  	"show_seal" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_marquee_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"kicker" varchar,
  	"year" varchar,
  	"statement" varchar,
  	"text" varchar,
  	"link_label" varchar,
  	"link_href" varchar,
  	"image_id" integer,
  	"small_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_film" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"kicker" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"video_id" integer,
  	"poster_id" integer,
  	"video_label" varchar,
  	"play_label" varchar,
  	"duration_label" varchar,
  	"transcript_title" varchar,
  	"transcript" varchar,
  	"upload_date" varchar,
  	"duration" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"suffix" varchar,
  	"count" boolean,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "pages_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"note" varchar,
  	"background" "enum_pages_blocks_stats_background" DEFAULT 'light',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_tiles_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"href" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_tiles_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_pages_blocks_tiles_buttons_kind" DEFAULT 'link',
  	"style" "enum_pages_blocks_tiles_buttons_style" DEFAULT 'copper',
  	"arrow" boolean,
  	"label" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_tiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"more_link_label" varchar,
  	"more_link_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_photo_band_meta" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_photo_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"statement" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_explorer_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tab_label" varchar,
  	"title" varchar,
  	"text" varchar,
  	"link_label" varchar,
  	"link_href" varchar,
  	"media_type" "enum_pages_blocks_explorer_tabs_media_type" DEFAULT 'image',
  	"image_id" integer,
  	"image_shape" "enum_pages_blocks_explorer_tabs_image_shape" DEFAULT 'wide',
  	"panel_corner" varchar,
  	"panel_big" varchar,
  	"panel_small" varchar,
  	"panel_label" varchar,
  	"panel_tone" "enum_pages_blocks_explorer_tabs_panel_tone" DEFAULT 'dark'
  );
  
  CREATE TABLE "pages_blocks_explorer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"tabs_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_pages_blocks_feature_buttons_kind" DEFAULT 'link',
  	"style" "enum_pages_blocks_feature_buttons_style" DEFAULT 'copper',
  	"arrow" boolean,
  	"label" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_quarters" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"suffix" varchar
  );
  
  CREATE TABLE "pages_blocks_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"quarters_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_audience_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"text" varchar,
  	"link_label" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_audience" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_location_band_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_pages_blocks_location_band_buttons_kind" DEFAULT 'link',
  	"style" "enum_pages_blocks_location_band_buttons_style" DEFAULT 'copper',
  	"arrow" boolean,
  	"label" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_location_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"kicker" varchar,
  	"statement" varchar,
  	"show_address" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_trust_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_trust_items_icon" DEFAULT 'shield',
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_trust" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"background" "enum_pages_blocks_trust_background" DEFAULT 'cream',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_documents_items_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_documents_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"label" varchar,
  	"title" varchar,
  	"link_label" varchar,
  	"zoom_label" varchar
  );
  
  CREATE TABLE "pages_blocks_documents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"background" "enum_pages_blocks_documents_background" DEFAULT 'light',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_steps_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"suffix" varchar,
  	"count" boolean,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_steps_items_chips" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_steps_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"nav_title" varchar,
  	"title" varchar,
  	"text" varchar,
  	"fact" varchar,
  	"link_label" varchar,
  	"link_href" varchar,
  	"media_type" "enum_pages_blocks_steps_items_media_type" DEFAULT 'image',
  	"image_id" integer,
  	"image_shape" "enum_pages_blocks_steps_items_image_shape" DEFAULT 'wide',
  	"panel_corner" varchar,
  	"panel_big" varchar,
  	"panel_small" varchar,
  	"panel_label" varchar,
  	"panel_tone" "enum_pages_blocks_steps_items_panel_tone" DEFAULT 'dark'
  );
  
  CREATE TABLE "pages_blocks_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nav_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_split" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"link_label" varchar,
  	"link_href" varchar,
  	"image_id" integer,
  	"image_shape" "enum_pages_blocks_split_image_shape" DEFAULT 'wide',
  	"show_credit" boolean,
  	"reverse" boolean,
  	"background" "enum_pages_blocks_split_background" DEFAULT 'cream',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_timeline_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" varchar,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"list_label" varchar,
  	"background" "enum_pages_blocks_timeline_background" DEFAULT 'light',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_route" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"link_label" varchar,
  	"link_href" varchar,
  	"from" varchar,
  	"to" varchar,
  	"drawing_label" varchar,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pillars_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_pillars_chain" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"current" boolean
  );
  
  CREATE TABLE "pages_blocks_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"kicker" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"image_id" integer,
  	"chain_label" varchar,
  	"background" "enum_pages_blocks_pillars_background" DEFAULT 'dark',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_usta_chips" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_usta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"shop_link_label" varchar,
  	"shop_link_href" varchar,
  	"info_label" varchar,
  	"card_kicker" varchar,
  	"card_title" varchar,
  	"card_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_planner_chips" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_planner_marks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" numeric,
  	"display" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_planner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"question" varchar,
  	"unit" varchar,
  	"min" numeric DEFAULT 1,
  	"max" numeric DEFAULT 400,
  	"start" numeric DEFAULT 20,
  	"multiplier" numeric DEFAULT 4,
  	"result_text" varchar,
  	"result_note" varchar,
  	"button_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_howto_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_howto" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"note" varchar,
  	"note_call" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"show_contacts" boolean DEFAULT true,
  	"background" "enum_pages_blocks_contact_background" DEFAULT 'coal2',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_map_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_pages_blocks_map_buttons_kind" DEFAULT 'link',
  	"style" "enum_pages_blocks_map_buttons_style" DEFAULT 'copper',
  	"arrow" boolean,
  	"label" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"cover_id" integer,
  	"cover_title" varchar,
  	"cover_text" varchar,
  	"button_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_legal_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_legal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"toc_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"noindex" boolean,
  	"slug" varchar,
  	"order" numeric DEFAULT 10,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_pages_v_blocks_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" "enum__pages_v_blocks_hero_buttons_kind" DEFAULT 'link',
  	"style" "enum__pages_v_blocks_hero_buttons_style" DEFAULT 'copper',
  	"arrow" boolean,
  	"label" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"is_phone" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"kicker" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"lead" varchar,
  	"scroll_label" varchar,
  	"show_seal" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_page_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" "enum__pages_v_blocks_page_hero_buttons_kind" DEFAULT 'link',
  	"style" "enum__pages_v_blocks_page_hero_buttons_style" DEFAULT 'copper',
  	"arrow" boolean,
  	"label" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_page_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_page_hero_variant" DEFAULT 'photo',
  	"image_id" integer,
  	"show_credit" boolean,
  	"crumb" varchar,
  	"title" varchar,
  	"lead" varchar,
  	"deco_word" varchar,
  	"show_seal" boolean,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_marquee_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"kicker" varchar,
  	"year" varchar,
  	"statement" varchar,
  	"text" varchar,
  	"link_label" varchar,
  	"link_href" varchar,
  	"image_id" integer,
  	"small_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_film" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"kicker" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"video_id" integer,
  	"poster_id" integer,
  	"video_label" varchar,
  	"play_label" varchar,
  	"duration_label" varchar,
  	"transcript_title" varchar,
  	"transcript" varchar,
  	"upload_date" varchar,
  	"duration" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"suffix" varchar,
  	"count" boolean,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"note" varchar,
  	"background" "enum__pages_v_blocks_stats_background" DEFAULT 'light',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tiles_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"href" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tiles_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" "enum__pages_v_blocks_tiles_buttons_kind" DEFAULT 'link',
  	"style" "enum__pages_v_blocks_tiles_buttons_style" DEFAULT 'copper',
  	"arrow" boolean,
  	"label" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"more_link_label" varchar,
  	"more_link_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_photo_band_meta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_photo_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"statement" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_explorer_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tab_label" varchar,
  	"title" varchar,
  	"text" varchar,
  	"link_label" varchar,
  	"link_href" varchar,
  	"media_type" "enum__pages_v_blocks_explorer_tabs_media_type" DEFAULT 'image',
  	"image_id" integer,
  	"image_shape" "enum__pages_v_blocks_explorer_tabs_image_shape" DEFAULT 'wide',
  	"panel_corner" varchar,
  	"panel_big" varchar,
  	"panel_small" varchar,
  	"panel_label" varchar,
  	"panel_tone" "enum__pages_v_blocks_explorer_tabs_panel_tone" DEFAULT 'dark',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_explorer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"tabs_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" "enum__pages_v_blocks_feature_buttons_kind" DEFAULT 'link',
  	"style" "enum__pages_v_blocks_feature_buttons_style" DEFAULT 'copper',
  	"arrow" boolean,
  	"label" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_quarters" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"suffix" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"quarters_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_audience_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"text" varchar,
  	"link_label" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_audience" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_location_band_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" "enum__pages_v_blocks_location_band_buttons_kind" DEFAULT 'link',
  	"style" "enum__pages_v_blocks_location_band_buttons_style" DEFAULT 'copper',
  	"arrow" boolean,
  	"label" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_location_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"kicker" varchar,
  	"statement" varchar,
  	"show_address" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_trust_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_trust_items_icon" DEFAULT 'shield',
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_trust" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"background" "enum__pages_v_blocks_trust_background" DEFAULT 'cream',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_documents_items_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_documents_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"label" varchar,
  	"title" varchar,
  	"link_label" varchar,
  	"zoom_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_documents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"background" "enum__pages_v_blocks_documents_background" DEFAULT 'light',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_steps_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"suffix" varchar,
  	"count" boolean,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_steps_items_chips" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_steps_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"nav_title" varchar,
  	"title" varchar,
  	"text" varchar,
  	"fact" varchar,
  	"link_label" varchar,
  	"link_href" varchar,
  	"media_type" "enum__pages_v_blocks_steps_items_media_type" DEFAULT 'image',
  	"image_id" integer,
  	"image_shape" "enum__pages_v_blocks_steps_items_image_shape" DEFAULT 'wide',
  	"panel_corner" varchar,
  	"panel_big" varchar,
  	"panel_small" varchar,
  	"panel_label" varchar,
  	"panel_tone" "enum__pages_v_blocks_steps_items_panel_tone" DEFAULT 'dark',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"nav_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_split" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"link_label" varchar,
  	"link_href" varchar,
  	"image_id" integer,
  	"image_shape" "enum__pages_v_blocks_split_image_shape" DEFAULT 'wide',
  	"show_credit" boolean,
  	"reverse" boolean,
  	"background" "enum__pages_v_blocks_split_background" DEFAULT 'cream',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_timeline_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"year" varchar,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"list_label" varchar,
  	"background" "enum__pages_v_blocks_timeline_background" DEFAULT 'light',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_route" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"link_label" varchar,
  	"link_href" varchar,
  	"from" varchar,
  	"to" varchar,
  	"drawing_label" varchar,
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pillars_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pillars_chain" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"current" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"kicker" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"image_id" integer,
  	"chain_label" varchar,
  	"background" "enum__pages_v_blocks_pillars_background" DEFAULT 'dark',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_usta_chips" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_usta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"text" varchar,
  	"shop_link_label" varchar,
  	"shop_link_href" varchar,
  	"info_label" varchar,
  	"card_kicker" varchar,
  	"card_title" varchar,
  	"card_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_planner_chips" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_planner_marks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" numeric,
  	"display" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_planner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"question" varchar,
  	"unit" varchar,
  	"min" numeric DEFAULT 1,
  	"max" numeric DEFAULT 400,
  	"start" numeric DEFAULT 20,
  	"multiplier" numeric DEFAULT 4,
  	"result_text" varchar,
  	"result_note" varchar,
  	"button_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_howto_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_howto" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"note" varchar,
  	"note_call" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"show_contacts" boolean DEFAULT true,
  	"background" "enum__pages_v_blocks_contact_background" DEFAULT 'coal2',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_map_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" "enum__pages_v_blocks_map_buttons_kind" DEFAULT 'link',
  	"style" "enum__pages_v_blocks_map_buttons_style" DEFAULT 'copper',
  	"arrow" boolean,
  	"label" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_map" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"cover_id" integer,
  	"cover_title" varchar,
  	"cover_text" varchar,
  	"button_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_legal_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_legal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"toc_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_noindex" boolean,
  	"version_slug" varchar,
  	"version_order" numeric DEFAULT 10,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"credit" varchar,
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_small_url" varchar,
  	"sizes_small_width" numeric,
  	"sizes_small_height" numeric,
  	"sizes_small_mime_type" varchar,
  	"sizes_small_filesize" numeric,
  	"sizes_small_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar
  );
  
  CREATE TABLE "quote_requests" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"company" varchar,
  	"phone" varchar NOT NULL,
  	"heads" varchar,
  	"message" varchar,
  	"status" "enum_quote_requests_status" DEFAULT 'new',
  	"note" varchar,
  	"source_page" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'superadmin' NOT NULL,
  	"totp_secret" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "audit_logs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer,
  	"action" "enum_audit_logs_action",
  	"entity" varchar,
  	"document_id" varchar,
  	"document_title" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "audit_logs_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "totp_attempts" (
  	"id" varchar PRIMARY KEY NOT NULL,
  	"attempts" numeric DEFAULT 0 NOT NULL,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"media_id" integer,
  	"quote_requests_id" integer,
  	"users_id" integer,
  	"audit_logs_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_cta_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_site_settings_cta_buttons_kind" DEFAULT 'link',
  	"style" "enum_site_settings_cta_buttons_style" DEFAULT 'copper',
  	"arrow" boolean,
  	"label" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "site_settings_not_found_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_site_settings_not_found_buttons_kind" DEFAULT 'link',
  	"style" "enum_site_settings_not_found_buttons_style" DEFAULT 'copper',
  	"arrow" boolean,
  	"label" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "site_settings_not_found_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"company_name" varchar NOT NULL,
  	"title_suffix" varchar,
  	"brand_subline" varchar,
  	"logo_id" integer NOT NULL,
  	"favicon_id" integer NOT NULL,
  	"apple_icon_id" integer,
  	"og_image_id" integer NOT NULL,
  	"default_description" varchar,
  	"business_description" varchar,
  	"founding_date" varchar,
  	"phone" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"address_line1" varchar NOT NULL,
  	"address_line2" varchar,
  	"address_short" varchar,
  	"city" varchar,
  	"directions_url" varchar NOT NULL,
  	"map_embed_url" varchar,
  	"map_search_url" varchar,
  	"phone_label" varchar,
  	"email_label" varchar,
  	"address_label" varchar,
  	"home_label" varchar,
  	"call_label" varchar,
  	"quote_label" varchar,
  	"quote_href" varchar,
  	"footer_text" varchar,
  	"footer_mark" varchar,
  	"copyright_name" varchar,
  	"footer_address_title" varchar,
  	"footer_contact_title" varchar,
  	"footer_pages_title" varchar,
  	"directions_label" varchar,
  	"legal_label" varchar,
  	"legal_href" varchar,
  	"to_top_label" varchar,
  	"seal_ring" varchar,
  	"seal_since" varchar,
  	"seal_year" varchar,
  	"cta_kicker" varchar,
  	"cta_heading" varchar NOT NULL,
  	"cta_show_phone" boolean DEFAULT true,
  	"form_title" varchar,
  	"form_intro" varchar,
  	"form_name_label" varchar,
  	"form_company_label" varchar,
  	"form_phone_label" varchar,
  	"form_heads_label" varchar,
  	"form_message_label" varchar,
  	"form_privacy_note" varchar,
  	"form_submit_label" varchar,
  	"form_sending_text" varchar,
  	"form_success_text" varchar,
  	"form_error_text" varchar,
  	"form_required_text" varchar,
  	"form_phone_invalid_text" varchar,
  	"form_or_call_text" varchar,
  	"form_noscript_text" varchar,
  	"not_found_kicker" varchar,
  	"not_found_deco" varchar,
  	"not_found_title" varchar NOT NULL,
  	"not_found_lead" varchar,
  	"not_found_meta_title" varchar,
  	"not_found_links_label" varchar,
  	"ui_skip_link" varchar,
  	"ui_main_menu" varchar,
  	"ui_mobile_menu" varchar,
  	"ui_open_menu" varchar,
  	"ui_close_menu" varchar,
  	"ui_breadcrumb" varchar,
  	"ui_quick_contact" varchar,
  	"ui_play_film" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_blocks_hero_buttons" ADD CONSTRAINT "pages_blocks_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_facts" ADD CONSTRAINT "pages_blocks_hero_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_page_hero_buttons" ADD CONSTRAINT "pages_blocks_page_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_page_hero" ADD CONSTRAINT "pages_blocks_page_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_page_hero" ADD CONSTRAINT "pages_blocks_page_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_marquee_items" ADD CONSTRAINT "pages_blocks_marquee_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_marquee"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_marquee" ADD CONSTRAINT "pages_blocks_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about" ADD CONSTRAINT "pages_blocks_about_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about" ADD CONSTRAINT "pages_blocks_about_small_image_id_media_id_fk" FOREIGN KEY ("small_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about" ADD CONSTRAINT "pages_blocks_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_film" ADD CONSTRAINT "pages_blocks_film_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_film" ADD CONSTRAINT "pages_blocks_film_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_film" ADD CONSTRAINT "pages_blocks_film_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_stats" ADD CONSTRAINT "pages_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_gallery" ADD CONSTRAINT "pages_blocks_stats_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_gallery" ADD CONSTRAINT "pages_blocks_stats_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tiles_items" ADD CONSTRAINT "pages_blocks_tiles_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_tiles_items" ADD CONSTRAINT "pages_blocks_tiles_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tiles_buttons" ADD CONSTRAINT "pages_blocks_tiles_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tiles" ADD CONSTRAINT "pages_blocks_tiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_photo_band_meta" ADD CONSTRAINT "pages_blocks_photo_band_meta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_photo_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_photo_band" ADD CONSTRAINT "pages_blocks_photo_band_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_photo_band" ADD CONSTRAINT "pages_blocks_photo_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_explorer_tabs" ADD CONSTRAINT "pages_blocks_explorer_tabs_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_explorer_tabs" ADD CONSTRAINT "pages_blocks_explorer_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_explorer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_explorer" ADD CONSTRAINT "pages_blocks_explorer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_steps" ADD CONSTRAINT "pages_blocks_feature_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_buttons" ADD CONSTRAINT "pages_blocks_feature_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_quarters" ADD CONSTRAINT "pages_blocks_feature_quarters_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature" ADD CONSTRAINT "pages_blocks_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_audience_items" ADD CONSTRAINT "pages_blocks_audience_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_audience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_audience" ADD CONSTRAINT "pages_blocks_audience_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_location_band_buttons" ADD CONSTRAINT "pages_blocks_location_band_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_location_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_location_band" ADD CONSTRAINT "pages_blocks_location_band_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_location_band" ADD CONSTRAINT "pages_blocks_location_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust_items" ADD CONSTRAINT "pages_blocks_trust_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_trust"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust" ADD CONSTRAINT "pages_blocks_trust_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_documents_items_rows" ADD CONSTRAINT "pages_blocks_documents_items_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_documents_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_documents_items" ADD CONSTRAINT "pages_blocks_documents_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_documents_items" ADD CONSTRAINT "pages_blocks_documents_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_documents" ADD CONSTRAINT "pages_blocks_documents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_steps_stats" ADD CONSTRAINT "pages_blocks_steps_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_steps_items_chips" ADD CONSTRAINT "pages_blocks_steps_items_chips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_steps_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_steps_items" ADD CONSTRAINT "pages_blocks_steps_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_steps_items" ADD CONSTRAINT "pages_blocks_steps_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_steps" ADD CONSTRAINT "pages_blocks_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_split" ADD CONSTRAINT "pages_blocks_split_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_split" ADD CONSTRAINT "pages_blocks_split_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline_items" ADD CONSTRAINT "pages_blocks_timeline_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline" ADD CONSTRAINT "pages_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_route" ADD CONSTRAINT "pages_blocks_route_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pillars_items" ADD CONSTRAINT "pages_blocks_pillars_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pillars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pillars_chain" ADD CONSTRAINT "pages_blocks_pillars_chain_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pillars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pillars" ADD CONSTRAINT "pages_blocks_pillars_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_pillars" ADD CONSTRAINT "pages_blocks_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_usta_chips" ADD CONSTRAINT "pages_blocks_usta_chips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_usta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_usta" ADD CONSTRAINT "pages_blocks_usta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_planner_chips" ADD CONSTRAINT "pages_blocks_planner_chips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_planner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_planner_marks" ADD CONSTRAINT "pages_blocks_planner_marks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_planner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_planner" ADD CONSTRAINT "pages_blocks_planner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_howto_items" ADD CONSTRAINT "pages_blocks_howto_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_howto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_howto" ADD CONSTRAINT "pages_blocks_howto_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact" ADD CONSTRAINT "pages_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_map_buttons" ADD CONSTRAINT "pages_blocks_map_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_map" ADD CONSTRAINT "pages_blocks_map_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_map" ADD CONSTRAINT "pages_blocks_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal_sections" ADD CONSTRAINT "pages_blocks_legal_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_legal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_legal" ADD CONSTRAINT "pages_blocks_legal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_buttons" ADD CONSTRAINT "_pages_v_blocks_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_facts" ADD CONSTRAINT "_pages_v_blocks_hero_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_page_hero_buttons" ADD CONSTRAINT "_pages_v_blocks_page_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_page_hero" ADD CONSTRAINT "_pages_v_blocks_page_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_page_hero" ADD CONSTRAINT "_pages_v_blocks_page_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_marquee_items" ADD CONSTRAINT "_pages_v_blocks_marquee_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_marquee"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_marquee" ADD CONSTRAINT "_pages_v_blocks_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about" ADD CONSTRAINT "_pages_v_blocks_about_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about" ADD CONSTRAINT "_pages_v_blocks_about_small_image_id_media_id_fk" FOREIGN KEY ("small_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about" ADD CONSTRAINT "_pages_v_blocks_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_film" ADD CONSTRAINT "_pages_v_blocks_film_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_film" ADD CONSTRAINT "_pages_v_blocks_film_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_film" ADD CONSTRAINT "_pages_v_blocks_film_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_stats" ADD CONSTRAINT "_pages_v_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_gallery" ADD CONSTRAINT "_pages_v_blocks_stats_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_gallery" ADD CONSTRAINT "_pages_v_blocks_stats_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats" ADD CONSTRAINT "_pages_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tiles_items" ADD CONSTRAINT "_pages_v_blocks_tiles_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tiles_items" ADD CONSTRAINT "_pages_v_blocks_tiles_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tiles_buttons" ADD CONSTRAINT "_pages_v_blocks_tiles_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tiles" ADD CONSTRAINT "_pages_v_blocks_tiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_photo_band_meta" ADD CONSTRAINT "_pages_v_blocks_photo_band_meta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_photo_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_photo_band" ADD CONSTRAINT "_pages_v_blocks_photo_band_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_photo_band" ADD CONSTRAINT "_pages_v_blocks_photo_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_explorer_tabs" ADD CONSTRAINT "_pages_v_blocks_explorer_tabs_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_explorer_tabs" ADD CONSTRAINT "_pages_v_blocks_explorer_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_explorer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_explorer" ADD CONSTRAINT "_pages_v_blocks_explorer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_steps" ADD CONSTRAINT "_pages_v_blocks_feature_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_buttons" ADD CONSTRAINT "_pages_v_blocks_feature_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_quarters" ADD CONSTRAINT "_pages_v_blocks_feature_quarters_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature" ADD CONSTRAINT "_pages_v_blocks_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_audience_items" ADD CONSTRAINT "_pages_v_blocks_audience_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_audience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_audience" ADD CONSTRAINT "_pages_v_blocks_audience_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_location_band_buttons" ADD CONSTRAINT "_pages_v_blocks_location_band_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_location_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_location_band" ADD CONSTRAINT "_pages_v_blocks_location_band_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_location_band" ADD CONSTRAINT "_pages_v_blocks_location_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_trust_items" ADD CONSTRAINT "_pages_v_blocks_trust_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_trust"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_trust" ADD CONSTRAINT "_pages_v_blocks_trust_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_documents_items_rows" ADD CONSTRAINT "_pages_v_blocks_documents_items_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_documents_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_documents_items" ADD CONSTRAINT "_pages_v_blocks_documents_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_documents_items" ADD CONSTRAINT "_pages_v_blocks_documents_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_documents" ADD CONSTRAINT "_pages_v_blocks_documents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_steps_stats" ADD CONSTRAINT "_pages_v_blocks_steps_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_steps_items_chips" ADD CONSTRAINT "_pages_v_blocks_steps_items_chips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_steps_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_steps_items" ADD CONSTRAINT "_pages_v_blocks_steps_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_steps_items" ADD CONSTRAINT "_pages_v_blocks_steps_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_steps" ADD CONSTRAINT "_pages_v_blocks_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split" ADD CONSTRAINT "_pages_v_blocks_split_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split" ADD CONSTRAINT "_pages_v_blocks_split_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline_items" ADD CONSTRAINT "_pages_v_blocks_timeline_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline" ADD CONSTRAINT "_pages_v_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_route" ADD CONSTRAINT "_pages_v_blocks_route_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pillars_items" ADD CONSTRAINT "_pages_v_blocks_pillars_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pillars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pillars_chain" ADD CONSTRAINT "_pages_v_blocks_pillars_chain_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pillars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pillars" ADD CONSTRAINT "_pages_v_blocks_pillars_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pillars" ADD CONSTRAINT "_pages_v_blocks_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_usta_chips" ADD CONSTRAINT "_pages_v_blocks_usta_chips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_usta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_usta" ADD CONSTRAINT "_pages_v_blocks_usta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_planner_chips" ADD CONSTRAINT "_pages_v_blocks_planner_chips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_planner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_planner_marks" ADD CONSTRAINT "_pages_v_blocks_planner_marks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_planner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_planner" ADD CONSTRAINT "_pages_v_blocks_planner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_howto_items" ADD CONSTRAINT "_pages_v_blocks_howto_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_howto"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_howto" ADD CONSTRAINT "_pages_v_blocks_howto_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items" ADD CONSTRAINT "_pages_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact" ADD CONSTRAINT "_pages_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_map_buttons" ADD CONSTRAINT "_pages_v_blocks_map_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_map" ADD CONSTRAINT "_pages_v_blocks_map_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_map" ADD CONSTRAINT "_pages_v_blocks_map_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal_sections" ADD CONSTRAINT "_pages_v_blocks_legal_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_legal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_legal" ADD CONSTRAINT "_pages_v_blocks_legal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "audit_logs_texts" ADD CONSTRAINT "audit_logs_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."audit_logs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_quote_requests_fk" FOREIGN KEY ("quote_requests_id") REFERENCES "public"."quote_requests"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_audit_logs_fk" FOREIGN KEY ("audit_logs_id") REFERENCES "public"."audit_logs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_nav" ADD CONSTRAINT "site_settings_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_cta_buttons" ADD CONSTRAINT "site_settings_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_not_found_buttons" ADD CONSTRAINT "site_settings_not_found_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_not_found_links" ADD CONSTRAINT "site_settings_not_found_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_apple_icon_id_media_id_fk" FOREIGN KEY ("apple_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_buttons_order_idx" ON "pages_blocks_hero_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_buttons_parent_id_idx" ON "pages_blocks_hero_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_facts_order_idx" ON "pages_blocks_hero_facts" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_facts_parent_id_idx" ON "pages_blocks_hero_facts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_image_idx" ON "pages_blocks_hero" USING btree ("image_id");
  CREATE INDEX "pages_blocks_page_hero_buttons_order_idx" ON "pages_blocks_page_hero_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_page_hero_buttons_parent_id_idx" ON "pages_blocks_page_hero_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_page_hero_order_idx" ON "pages_blocks_page_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_page_hero_parent_id_idx" ON "pages_blocks_page_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_page_hero_path_idx" ON "pages_blocks_page_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_page_hero_image_idx" ON "pages_blocks_page_hero" USING btree ("image_id");
  CREATE INDEX "pages_blocks_marquee_items_order_idx" ON "pages_blocks_marquee_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_marquee_items_parent_id_idx" ON "pages_blocks_marquee_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_marquee_order_idx" ON "pages_blocks_marquee" USING btree ("_order");
  CREATE INDEX "pages_blocks_marquee_parent_id_idx" ON "pages_blocks_marquee" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_marquee_path_idx" ON "pages_blocks_marquee" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_order_idx" ON "pages_blocks_about" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_parent_id_idx" ON "pages_blocks_about" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_path_idx" ON "pages_blocks_about" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_image_idx" ON "pages_blocks_about" USING btree ("image_id");
  CREATE INDEX "pages_blocks_about_small_image_idx" ON "pages_blocks_about" USING btree ("small_image_id");
  CREATE INDEX "pages_blocks_film_order_idx" ON "pages_blocks_film" USING btree ("_order");
  CREATE INDEX "pages_blocks_film_parent_id_idx" ON "pages_blocks_film" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_film_path_idx" ON "pages_blocks_film" USING btree ("_path");
  CREATE INDEX "pages_blocks_film_video_idx" ON "pages_blocks_film" USING btree ("video_id");
  CREATE INDEX "pages_blocks_film_poster_idx" ON "pages_blocks_film" USING btree ("poster_id");
  CREATE INDEX "pages_blocks_stats_stats_order_idx" ON "pages_blocks_stats_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_stats_parent_id_idx" ON "pages_blocks_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_gallery_order_idx" ON "pages_blocks_stats_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_gallery_parent_id_idx" ON "pages_blocks_stats_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_gallery_image_idx" ON "pages_blocks_stats_gallery" USING btree ("image_id");
  CREATE INDEX "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_tiles_items_order_idx" ON "pages_blocks_tiles_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_tiles_items_parent_id_idx" ON "pages_blocks_tiles_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tiles_items_image_idx" ON "pages_blocks_tiles_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_tiles_buttons_order_idx" ON "pages_blocks_tiles_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_tiles_buttons_parent_id_idx" ON "pages_blocks_tiles_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tiles_order_idx" ON "pages_blocks_tiles" USING btree ("_order");
  CREATE INDEX "pages_blocks_tiles_parent_id_idx" ON "pages_blocks_tiles" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tiles_path_idx" ON "pages_blocks_tiles" USING btree ("_path");
  CREATE INDEX "pages_blocks_photo_band_meta_order_idx" ON "pages_blocks_photo_band_meta" USING btree ("_order");
  CREATE INDEX "pages_blocks_photo_band_meta_parent_id_idx" ON "pages_blocks_photo_band_meta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_photo_band_order_idx" ON "pages_blocks_photo_band" USING btree ("_order");
  CREATE INDEX "pages_blocks_photo_band_parent_id_idx" ON "pages_blocks_photo_band" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_photo_band_path_idx" ON "pages_blocks_photo_band" USING btree ("_path");
  CREATE INDEX "pages_blocks_photo_band_image_idx" ON "pages_blocks_photo_band" USING btree ("image_id");
  CREATE INDEX "pages_blocks_explorer_tabs_order_idx" ON "pages_blocks_explorer_tabs" USING btree ("_order");
  CREATE INDEX "pages_blocks_explorer_tabs_parent_id_idx" ON "pages_blocks_explorer_tabs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_explorer_tabs_image_idx" ON "pages_blocks_explorer_tabs" USING btree ("image_id");
  CREATE INDEX "pages_blocks_explorer_order_idx" ON "pages_blocks_explorer" USING btree ("_order");
  CREATE INDEX "pages_blocks_explorer_parent_id_idx" ON "pages_blocks_explorer" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_explorer_path_idx" ON "pages_blocks_explorer" USING btree ("_path");
  CREATE INDEX "pages_blocks_feature_steps_order_idx" ON "pages_blocks_feature_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_steps_parent_id_idx" ON "pages_blocks_feature_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_buttons_order_idx" ON "pages_blocks_feature_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_buttons_parent_id_idx" ON "pages_blocks_feature_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_quarters_order_idx" ON "pages_blocks_feature_quarters" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_quarters_parent_id_idx" ON "pages_blocks_feature_quarters" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_order_idx" ON "pages_blocks_feature" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_parent_id_idx" ON "pages_blocks_feature" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_path_idx" ON "pages_blocks_feature" USING btree ("_path");
  CREATE INDEX "pages_blocks_audience_items_order_idx" ON "pages_blocks_audience_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_audience_items_parent_id_idx" ON "pages_blocks_audience_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_audience_order_idx" ON "pages_blocks_audience" USING btree ("_order");
  CREATE INDEX "pages_blocks_audience_parent_id_idx" ON "pages_blocks_audience" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_audience_path_idx" ON "pages_blocks_audience" USING btree ("_path");
  CREATE INDEX "pages_blocks_location_band_buttons_order_idx" ON "pages_blocks_location_band_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_location_band_buttons_parent_id_idx" ON "pages_blocks_location_band_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_location_band_order_idx" ON "pages_blocks_location_band" USING btree ("_order");
  CREATE INDEX "pages_blocks_location_band_parent_id_idx" ON "pages_blocks_location_band" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_location_band_path_idx" ON "pages_blocks_location_band" USING btree ("_path");
  CREATE INDEX "pages_blocks_location_band_image_idx" ON "pages_blocks_location_band" USING btree ("image_id");
  CREATE INDEX "pages_blocks_trust_items_order_idx" ON "pages_blocks_trust_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_trust_items_parent_id_idx" ON "pages_blocks_trust_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_trust_order_idx" ON "pages_blocks_trust" USING btree ("_order");
  CREATE INDEX "pages_blocks_trust_parent_id_idx" ON "pages_blocks_trust" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_trust_path_idx" ON "pages_blocks_trust" USING btree ("_path");
  CREATE INDEX "pages_blocks_documents_items_rows_order_idx" ON "pages_blocks_documents_items_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_documents_items_rows_parent_id_idx" ON "pages_blocks_documents_items_rows" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_documents_items_order_idx" ON "pages_blocks_documents_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_documents_items_parent_id_idx" ON "pages_blocks_documents_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_documents_items_image_idx" ON "pages_blocks_documents_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_documents_order_idx" ON "pages_blocks_documents" USING btree ("_order");
  CREATE INDEX "pages_blocks_documents_parent_id_idx" ON "pages_blocks_documents" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_documents_path_idx" ON "pages_blocks_documents" USING btree ("_path");
  CREATE INDEX "pages_blocks_steps_stats_order_idx" ON "pages_blocks_steps_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_steps_stats_parent_id_idx" ON "pages_blocks_steps_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_steps_items_chips_order_idx" ON "pages_blocks_steps_items_chips" USING btree ("_order");
  CREATE INDEX "pages_blocks_steps_items_chips_parent_id_idx" ON "pages_blocks_steps_items_chips" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_steps_items_order_idx" ON "pages_blocks_steps_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_steps_items_parent_id_idx" ON "pages_blocks_steps_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_steps_items_image_idx" ON "pages_blocks_steps_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_steps_order_idx" ON "pages_blocks_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_steps_parent_id_idx" ON "pages_blocks_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_steps_path_idx" ON "pages_blocks_steps" USING btree ("_path");
  CREATE INDEX "pages_blocks_split_order_idx" ON "pages_blocks_split" USING btree ("_order");
  CREATE INDEX "pages_blocks_split_parent_id_idx" ON "pages_blocks_split" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_split_path_idx" ON "pages_blocks_split" USING btree ("_path");
  CREATE INDEX "pages_blocks_split_image_idx" ON "pages_blocks_split" USING btree ("image_id");
  CREATE INDEX "pages_blocks_timeline_items_order_idx" ON "pages_blocks_timeline_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_timeline_items_parent_id_idx" ON "pages_blocks_timeline_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_order_idx" ON "pages_blocks_timeline" USING btree ("_order");
  CREATE INDEX "pages_blocks_timeline_parent_id_idx" ON "pages_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_path_idx" ON "pages_blocks_timeline" USING btree ("_path");
  CREATE INDEX "pages_blocks_route_order_idx" ON "pages_blocks_route" USING btree ("_order");
  CREATE INDEX "pages_blocks_route_parent_id_idx" ON "pages_blocks_route" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_route_path_idx" ON "pages_blocks_route" USING btree ("_path");
  CREATE INDEX "pages_blocks_pillars_items_order_idx" ON "pages_blocks_pillars_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_pillars_items_parent_id_idx" ON "pages_blocks_pillars_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pillars_chain_order_idx" ON "pages_blocks_pillars_chain" USING btree ("_order");
  CREATE INDEX "pages_blocks_pillars_chain_parent_id_idx" ON "pages_blocks_pillars_chain" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pillars_order_idx" ON "pages_blocks_pillars" USING btree ("_order");
  CREATE INDEX "pages_blocks_pillars_parent_id_idx" ON "pages_blocks_pillars" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pillars_path_idx" ON "pages_blocks_pillars" USING btree ("_path");
  CREATE INDEX "pages_blocks_pillars_image_idx" ON "pages_blocks_pillars" USING btree ("image_id");
  CREATE INDEX "pages_blocks_usta_chips_order_idx" ON "pages_blocks_usta_chips" USING btree ("_order");
  CREATE INDEX "pages_blocks_usta_chips_parent_id_idx" ON "pages_blocks_usta_chips" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_usta_order_idx" ON "pages_blocks_usta" USING btree ("_order");
  CREATE INDEX "pages_blocks_usta_parent_id_idx" ON "pages_blocks_usta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_usta_path_idx" ON "pages_blocks_usta" USING btree ("_path");
  CREATE INDEX "pages_blocks_planner_chips_order_idx" ON "pages_blocks_planner_chips" USING btree ("_order");
  CREATE INDEX "pages_blocks_planner_chips_parent_id_idx" ON "pages_blocks_planner_chips" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_planner_marks_order_idx" ON "pages_blocks_planner_marks" USING btree ("_order");
  CREATE INDEX "pages_blocks_planner_marks_parent_id_idx" ON "pages_blocks_planner_marks" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_planner_order_idx" ON "pages_blocks_planner" USING btree ("_order");
  CREATE INDEX "pages_blocks_planner_parent_id_idx" ON "pages_blocks_planner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_planner_path_idx" ON "pages_blocks_planner" USING btree ("_path");
  CREATE INDEX "pages_blocks_howto_items_order_idx" ON "pages_blocks_howto_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_howto_items_parent_id_idx" ON "pages_blocks_howto_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_howto_order_idx" ON "pages_blocks_howto" USING btree ("_order");
  CREATE INDEX "pages_blocks_howto_parent_id_idx" ON "pages_blocks_howto" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_howto_path_idx" ON "pages_blocks_howto" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_items_order_idx" ON "pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_parent_id_idx" ON "pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_order_idx" ON "pages_blocks_contact" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_parent_id_idx" ON "pages_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_path_idx" ON "pages_blocks_contact" USING btree ("_path");
  CREATE INDEX "pages_blocks_map_buttons_order_idx" ON "pages_blocks_map_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_map_buttons_parent_id_idx" ON "pages_blocks_map_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_map_order_idx" ON "pages_blocks_map" USING btree ("_order");
  CREATE INDEX "pages_blocks_map_parent_id_idx" ON "pages_blocks_map" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_map_path_idx" ON "pages_blocks_map" USING btree ("_path");
  CREATE INDEX "pages_blocks_map_cover_idx" ON "pages_blocks_map" USING btree ("cover_id");
  CREATE INDEX "pages_blocks_legal_sections_order_idx" ON "pages_blocks_legal_sections" USING btree ("_order");
  CREATE INDEX "pages_blocks_legal_sections_parent_id_idx" ON "pages_blocks_legal_sections" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_legal_order_idx" ON "pages_blocks_legal" USING btree ("_order");
  CREATE INDEX "pages_blocks_legal_parent_id_idx" ON "pages_blocks_legal" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_legal_path_idx" ON "pages_blocks_legal" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "_pages_v_blocks_hero_buttons_order_idx" ON "_pages_v_blocks_hero_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_buttons_parent_id_idx" ON "_pages_v_blocks_hero_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_facts_order_idx" ON "_pages_v_blocks_hero_facts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_facts_parent_id_idx" ON "_pages_v_blocks_hero_facts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_image_idx" ON "_pages_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_page_hero_buttons_order_idx" ON "_pages_v_blocks_page_hero_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_page_hero_buttons_parent_id_idx" ON "_pages_v_blocks_page_hero_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_page_hero_order_idx" ON "_pages_v_blocks_page_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_page_hero_parent_id_idx" ON "_pages_v_blocks_page_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_page_hero_path_idx" ON "_pages_v_blocks_page_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_page_hero_image_idx" ON "_pages_v_blocks_page_hero" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_marquee_items_order_idx" ON "_pages_v_blocks_marquee_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_marquee_items_parent_id_idx" ON "_pages_v_blocks_marquee_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_marquee_order_idx" ON "_pages_v_blocks_marquee" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_marquee_parent_id_idx" ON "_pages_v_blocks_marquee" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_marquee_path_idx" ON "_pages_v_blocks_marquee" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_about_order_idx" ON "_pages_v_blocks_about" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_parent_id_idx" ON "_pages_v_blocks_about" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_path_idx" ON "_pages_v_blocks_about" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_about_image_idx" ON "_pages_v_blocks_about" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_about_small_image_idx" ON "_pages_v_blocks_about" USING btree ("small_image_id");
  CREATE INDEX "_pages_v_blocks_film_order_idx" ON "_pages_v_blocks_film" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_film_parent_id_idx" ON "_pages_v_blocks_film" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_film_path_idx" ON "_pages_v_blocks_film" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_film_video_idx" ON "_pages_v_blocks_film" USING btree ("video_id");
  CREATE INDEX "_pages_v_blocks_film_poster_idx" ON "_pages_v_blocks_film" USING btree ("poster_id");
  CREATE INDEX "_pages_v_blocks_stats_stats_order_idx" ON "_pages_v_blocks_stats_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_stats_parent_id_idx" ON "_pages_v_blocks_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_gallery_order_idx" ON "_pages_v_blocks_stats_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_gallery_parent_id_idx" ON "_pages_v_blocks_stats_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_gallery_image_idx" ON "_pages_v_blocks_stats_gallery" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_stats_order_idx" ON "_pages_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_parent_id_idx" ON "_pages_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_path_idx" ON "_pages_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_tiles_items_order_idx" ON "_pages_v_blocks_tiles_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tiles_items_parent_id_idx" ON "_pages_v_blocks_tiles_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tiles_items_image_idx" ON "_pages_v_blocks_tiles_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_tiles_buttons_order_idx" ON "_pages_v_blocks_tiles_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tiles_buttons_parent_id_idx" ON "_pages_v_blocks_tiles_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tiles_order_idx" ON "_pages_v_blocks_tiles" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tiles_parent_id_idx" ON "_pages_v_blocks_tiles" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tiles_path_idx" ON "_pages_v_blocks_tiles" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_photo_band_meta_order_idx" ON "_pages_v_blocks_photo_band_meta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_photo_band_meta_parent_id_idx" ON "_pages_v_blocks_photo_band_meta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_photo_band_order_idx" ON "_pages_v_blocks_photo_band" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_photo_band_parent_id_idx" ON "_pages_v_blocks_photo_band" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_photo_band_path_idx" ON "_pages_v_blocks_photo_band" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_photo_band_image_idx" ON "_pages_v_blocks_photo_band" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_explorer_tabs_order_idx" ON "_pages_v_blocks_explorer_tabs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_explorer_tabs_parent_id_idx" ON "_pages_v_blocks_explorer_tabs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_explorer_tabs_image_idx" ON "_pages_v_blocks_explorer_tabs" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_explorer_order_idx" ON "_pages_v_blocks_explorer" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_explorer_parent_id_idx" ON "_pages_v_blocks_explorer" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_explorer_path_idx" ON "_pages_v_blocks_explorer" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_feature_steps_order_idx" ON "_pages_v_blocks_feature_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_steps_parent_id_idx" ON "_pages_v_blocks_feature_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_buttons_order_idx" ON "_pages_v_blocks_feature_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_buttons_parent_id_idx" ON "_pages_v_blocks_feature_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_quarters_order_idx" ON "_pages_v_blocks_feature_quarters" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_quarters_parent_id_idx" ON "_pages_v_blocks_feature_quarters" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_order_idx" ON "_pages_v_blocks_feature" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_parent_id_idx" ON "_pages_v_blocks_feature" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_path_idx" ON "_pages_v_blocks_feature" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_audience_items_order_idx" ON "_pages_v_blocks_audience_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_audience_items_parent_id_idx" ON "_pages_v_blocks_audience_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_audience_order_idx" ON "_pages_v_blocks_audience" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_audience_parent_id_idx" ON "_pages_v_blocks_audience" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_audience_path_idx" ON "_pages_v_blocks_audience" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_location_band_buttons_order_idx" ON "_pages_v_blocks_location_band_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_location_band_buttons_parent_id_idx" ON "_pages_v_blocks_location_band_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_location_band_order_idx" ON "_pages_v_blocks_location_band" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_location_band_parent_id_idx" ON "_pages_v_blocks_location_band" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_location_band_path_idx" ON "_pages_v_blocks_location_band" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_location_band_image_idx" ON "_pages_v_blocks_location_band" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_trust_items_order_idx" ON "_pages_v_blocks_trust_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_trust_items_parent_id_idx" ON "_pages_v_blocks_trust_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_trust_order_idx" ON "_pages_v_blocks_trust" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_trust_parent_id_idx" ON "_pages_v_blocks_trust" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_trust_path_idx" ON "_pages_v_blocks_trust" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_documents_items_rows_order_idx" ON "_pages_v_blocks_documents_items_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_documents_items_rows_parent_id_idx" ON "_pages_v_blocks_documents_items_rows" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_documents_items_order_idx" ON "_pages_v_blocks_documents_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_documents_items_parent_id_idx" ON "_pages_v_blocks_documents_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_documents_items_image_idx" ON "_pages_v_blocks_documents_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_documents_order_idx" ON "_pages_v_blocks_documents" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_documents_parent_id_idx" ON "_pages_v_blocks_documents" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_documents_path_idx" ON "_pages_v_blocks_documents" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_steps_stats_order_idx" ON "_pages_v_blocks_steps_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_steps_stats_parent_id_idx" ON "_pages_v_blocks_steps_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_steps_items_chips_order_idx" ON "_pages_v_blocks_steps_items_chips" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_steps_items_chips_parent_id_idx" ON "_pages_v_blocks_steps_items_chips" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_steps_items_order_idx" ON "_pages_v_blocks_steps_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_steps_items_parent_id_idx" ON "_pages_v_blocks_steps_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_steps_items_image_idx" ON "_pages_v_blocks_steps_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_steps_order_idx" ON "_pages_v_blocks_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_steps_parent_id_idx" ON "_pages_v_blocks_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_steps_path_idx" ON "_pages_v_blocks_steps" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_split_order_idx" ON "_pages_v_blocks_split" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_split_parent_id_idx" ON "_pages_v_blocks_split" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_split_path_idx" ON "_pages_v_blocks_split" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_split_image_idx" ON "_pages_v_blocks_split" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_timeline_items_order_idx" ON "_pages_v_blocks_timeline_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_timeline_items_parent_id_idx" ON "_pages_v_blocks_timeline_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_order_idx" ON "_pages_v_blocks_timeline" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_timeline_parent_id_idx" ON "_pages_v_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_path_idx" ON "_pages_v_blocks_timeline" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_route_order_idx" ON "_pages_v_blocks_route" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_route_parent_id_idx" ON "_pages_v_blocks_route" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_route_path_idx" ON "_pages_v_blocks_route" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pillars_items_order_idx" ON "_pages_v_blocks_pillars_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pillars_items_parent_id_idx" ON "_pages_v_blocks_pillars_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pillars_chain_order_idx" ON "_pages_v_blocks_pillars_chain" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pillars_chain_parent_id_idx" ON "_pages_v_blocks_pillars_chain" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pillars_order_idx" ON "_pages_v_blocks_pillars" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pillars_parent_id_idx" ON "_pages_v_blocks_pillars" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pillars_path_idx" ON "_pages_v_blocks_pillars" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pillars_image_idx" ON "_pages_v_blocks_pillars" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_usta_chips_order_idx" ON "_pages_v_blocks_usta_chips" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_usta_chips_parent_id_idx" ON "_pages_v_blocks_usta_chips" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_usta_order_idx" ON "_pages_v_blocks_usta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_usta_parent_id_idx" ON "_pages_v_blocks_usta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_usta_path_idx" ON "_pages_v_blocks_usta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_planner_chips_order_idx" ON "_pages_v_blocks_planner_chips" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_planner_chips_parent_id_idx" ON "_pages_v_blocks_planner_chips" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_planner_marks_order_idx" ON "_pages_v_blocks_planner_marks" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_planner_marks_parent_id_idx" ON "_pages_v_blocks_planner_marks" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_planner_order_idx" ON "_pages_v_blocks_planner" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_planner_parent_id_idx" ON "_pages_v_blocks_planner" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_planner_path_idx" ON "_pages_v_blocks_planner" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_howto_items_order_idx" ON "_pages_v_blocks_howto_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_howto_items_parent_id_idx" ON "_pages_v_blocks_howto_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_howto_order_idx" ON "_pages_v_blocks_howto" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_howto_parent_id_idx" ON "_pages_v_blocks_howto" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_howto_path_idx" ON "_pages_v_blocks_howto" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_items_order_idx" ON "_pages_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_items_parent_id_idx" ON "_pages_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_order_idx" ON "_pages_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_parent_id_idx" ON "_pages_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_path_idx" ON "_pages_v_blocks_contact" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_map_buttons_order_idx" ON "_pages_v_blocks_map_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_map_buttons_parent_id_idx" ON "_pages_v_blocks_map_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_map_order_idx" ON "_pages_v_blocks_map" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_map_parent_id_idx" ON "_pages_v_blocks_map" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_map_path_idx" ON "_pages_v_blocks_map" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_map_cover_idx" ON "_pages_v_blocks_map" USING btree ("cover_id");
  CREATE INDEX "_pages_v_blocks_legal_sections_order_idx" ON "_pages_v_blocks_legal_sections" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_legal_sections_parent_id_idx" ON "_pages_v_blocks_legal_sections" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_legal_order_idx" ON "_pages_v_blocks_legal" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_legal_parent_id_idx" ON "_pages_v_blocks_legal" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_legal_path_idx" ON "_pages_v_blocks_legal" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");
  CREATE INDEX "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX "quote_requests_status_idx" ON "quote_requests" USING btree ("status");
  CREATE INDEX "quote_requests_updated_at_idx" ON "quote_requests" USING btree ("updated_at");
  CREATE INDEX "quote_requests_created_at_idx" ON "quote_requests" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "audit_logs_user_idx" ON "audit_logs" USING btree ("user_id");
  CREATE INDEX "audit_logs_action_idx" ON "audit_logs" USING btree ("action");
  CREATE INDEX "audit_logs_entity_idx" ON "audit_logs" USING btree ("entity");
  CREATE INDEX "audit_logs_updated_at_idx" ON "audit_logs" USING btree ("updated_at");
  CREATE INDEX "audit_logs_created_at_idx" ON "audit_logs" USING btree ("created_at");
  CREATE INDEX "audit_logs_texts_order_parent" ON "audit_logs_texts" USING btree ("order","parent_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_quote_requests_id_idx" ON "payload_locked_documents_rels" USING btree ("quote_requests_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_audit_logs_id_idx" ON "payload_locked_documents_rels" USING btree ("audit_logs_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_nav_order_idx" ON "site_settings_nav" USING btree ("_order");
  CREATE INDEX "site_settings_nav_parent_id_idx" ON "site_settings_nav" USING btree ("_parent_id");
  CREATE INDEX "site_settings_cta_buttons_order_idx" ON "site_settings_cta_buttons" USING btree ("_order");
  CREATE INDEX "site_settings_cta_buttons_parent_id_idx" ON "site_settings_cta_buttons" USING btree ("_parent_id");
  CREATE INDEX "site_settings_not_found_buttons_order_idx" ON "site_settings_not_found_buttons" USING btree ("_order");
  CREATE INDEX "site_settings_not_found_buttons_parent_id_idx" ON "site_settings_not_found_buttons" USING btree ("_parent_id");
  CREATE INDEX "site_settings_not_found_links_order_idx" ON "site_settings_not_found_links" USING btree ("_order");
  CREATE INDEX "site_settings_not_found_links_parent_id_idx" ON "site_settings_not_found_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_favicon_idx" ON "site_settings" USING btree ("favicon_id");
  CREATE INDEX "site_settings_apple_icon_idx" ON "site_settings" USING btree ("apple_icon_id");
  CREATE INDEX "site_settings_og_image_idx" ON "site_settings" USING btree ("og_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_hero_buttons" CASCADE;
  DROP TABLE "pages_blocks_hero_facts" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_page_hero_buttons" CASCADE;
  DROP TABLE "pages_blocks_page_hero" CASCADE;
  DROP TABLE "pages_blocks_marquee_items" CASCADE;
  DROP TABLE "pages_blocks_marquee" CASCADE;
  DROP TABLE "pages_blocks_about" CASCADE;
  DROP TABLE "pages_blocks_film" CASCADE;
  DROP TABLE "pages_blocks_stats_stats" CASCADE;
  DROP TABLE "pages_blocks_stats_gallery" CASCADE;
  DROP TABLE "pages_blocks_stats" CASCADE;
  DROP TABLE "pages_blocks_tiles_items" CASCADE;
  DROP TABLE "pages_blocks_tiles_buttons" CASCADE;
  DROP TABLE "pages_blocks_tiles" CASCADE;
  DROP TABLE "pages_blocks_photo_band_meta" CASCADE;
  DROP TABLE "pages_blocks_photo_band" CASCADE;
  DROP TABLE "pages_blocks_explorer_tabs" CASCADE;
  DROP TABLE "pages_blocks_explorer" CASCADE;
  DROP TABLE "pages_blocks_feature_steps" CASCADE;
  DROP TABLE "pages_blocks_feature_buttons" CASCADE;
  DROP TABLE "pages_blocks_feature_quarters" CASCADE;
  DROP TABLE "pages_blocks_feature" CASCADE;
  DROP TABLE "pages_blocks_audience_items" CASCADE;
  DROP TABLE "pages_blocks_audience" CASCADE;
  DROP TABLE "pages_blocks_location_band_buttons" CASCADE;
  DROP TABLE "pages_blocks_location_band" CASCADE;
  DROP TABLE "pages_blocks_trust_items" CASCADE;
  DROP TABLE "pages_blocks_trust" CASCADE;
  DROP TABLE "pages_blocks_documents_items_rows" CASCADE;
  DROP TABLE "pages_blocks_documents_items" CASCADE;
  DROP TABLE "pages_blocks_documents" CASCADE;
  DROP TABLE "pages_blocks_steps_stats" CASCADE;
  DROP TABLE "pages_blocks_steps_items_chips" CASCADE;
  DROP TABLE "pages_blocks_steps_items" CASCADE;
  DROP TABLE "pages_blocks_steps" CASCADE;
  DROP TABLE "pages_blocks_split" CASCADE;
  DROP TABLE "pages_blocks_timeline_items" CASCADE;
  DROP TABLE "pages_blocks_timeline" CASCADE;
  DROP TABLE "pages_blocks_route" CASCADE;
  DROP TABLE "pages_blocks_pillars_items" CASCADE;
  DROP TABLE "pages_blocks_pillars_chain" CASCADE;
  DROP TABLE "pages_blocks_pillars" CASCADE;
  DROP TABLE "pages_blocks_usta_chips" CASCADE;
  DROP TABLE "pages_blocks_usta" CASCADE;
  DROP TABLE "pages_blocks_planner_chips" CASCADE;
  DROP TABLE "pages_blocks_planner_marks" CASCADE;
  DROP TABLE "pages_blocks_planner" CASCADE;
  DROP TABLE "pages_blocks_howto_items" CASCADE;
  DROP TABLE "pages_blocks_howto" CASCADE;
  DROP TABLE "pages_blocks_faq_items" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_contact" CASCADE;
  DROP TABLE "pages_blocks_map_buttons" CASCADE;
  DROP TABLE "pages_blocks_map" CASCADE;
  DROP TABLE "pages_blocks_legal_sections" CASCADE;
  DROP TABLE "pages_blocks_legal" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_facts" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_page_hero_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_page_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_marquee_items" CASCADE;
  DROP TABLE "_pages_v_blocks_marquee" CASCADE;
  DROP TABLE "_pages_v_blocks_about" CASCADE;
  DROP TABLE "_pages_v_blocks_film" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_tiles_items" CASCADE;
  DROP TABLE "_pages_v_blocks_tiles_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_tiles" CASCADE;
  DROP TABLE "_pages_v_blocks_photo_band_meta" CASCADE;
  DROP TABLE "_pages_v_blocks_photo_band" CASCADE;
  DROP TABLE "_pages_v_blocks_explorer_tabs" CASCADE;
  DROP TABLE "_pages_v_blocks_explorer" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_quarters" CASCADE;
  DROP TABLE "_pages_v_blocks_feature" CASCADE;
  DROP TABLE "_pages_v_blocks_audience_items" CASCADE;
  DROP TABLE "_pages_v_blocks_audience" CASCADE;
  DROP TABLE "_pages_v_blocks_location_band_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_location_band" CASCADE;
  DROP TABLE "_pages_v_blocks_trust_items" CASCADE;
  DROP TABLE "_pages_v_blocks_trust" CASCADE;
  DROP TABLE "_pages_v_blocks_documents_items_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_documents_items" CASCADE;
  DROP TABLE "_pages_v_blocks_documents" CASCADE;
  DROP TABLE "_pages_v_blocks_steps_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_steps_items_chips" CASCADE;
  DROP TABLE "_pages_v_blocks_steps_items" CASCADE;
  DROP TABLE "_pages_v_blocks_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_split" CASCADE;
  DROP TABLE "_pages_v_blocks_timeline_items" CASCADE;
  DROP TABLE "_pages_v_blocks_timeline" CASCADE;
  DROP TABLE "_pages_v_blocks_route" CASCADE;
  DROP TABLE "_pages_v_blocks_pillars_items" CASCADE;
  DROP TABLE "_pages_v_blocks_pillars_chain" CASCADE;
  DROP TABLE "_pages_v_blocks_pillars" CASCADE;
  DROP TABLE "_pages_v_blocks_usta_chips" CASCADE;
  DROP TABLE "_pages_v_blocks_usta" CASCADE;
  DROP TABLE "_pages_v_blocks_planner_chips" CASCADE;
  DROP TABLE "_pages_v_blocks_planner_marks" CASCADE;
  DROP TABLE "_pages_v_blocks_planner" CASCADE;
  DROP TABLE "_pages_v_blocks_howto_items" CASCADE;
  DROP TABLE "_pages_v_blocks_howto" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_contact" CASCADE;
  DROP TABLE "_pages_v_blocks_map_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_map" CASCADE;
  DROP TABLE "_pages_v_blocks_legal_sections" CASCADE;
  DROP TABLE "_pages_v_blocks_legal" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "quote_requests" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "audit_logs" CASCADE;
  DROP TABLE "audit_logs_texts" CASCADE;
  DROP TABLE "totp_attempts" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_nav" CASCADE;
  DROP TABLE "site_settings_cta_buttons" CASCADE;
  DROP TABLE "site_settings_not_found_buttons" CASCADE;
  DROP TABLE "site_settings_not_found_links" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_hero_buttons_kind";
  DROP TYPE "public"."enum_pages_blocks_hero_buttons_style";
  DROP TYPE "public"."enum_pages_blocks_page_hero_buttons_kind";
  DROP TYPE "public"."enum_pages_blocks_page_hero_buttons_style";
  DROP TYPE "public"."enum_pages_blocks_page_hero_variant";
  DROP TYPE "public"."enum_pages_blocks_stats_background";
  DROP TYPE "public"."enum_pages_blocks_tiles_buttons_kind";
  DROP TYPE "public"."enum_pages_blocks_tiles_buttons_style";
  DROP TYPE "public"."enum_pages_blocks_explorer_tabs_media_type";
  DROP TYPE "public"."enum_pages_blocks_explorer_tabs_image_shape";
  DROP TYPE "public"."enum_pages_blocks_explorer_tabs_panel_tone";
  DROP TYPE "public"."enum_pages_blocks_feature_buttons_kind";
  DROP TYPE "public"."enum_pages_blocks_feature_buttons_style";
  DROP TYPE "public"."enum_pages_blocks_location_band_buttons_kind";
  DROP TYPE "public"."enum_pages_blocks_location_band_buttons_style";
  DROP TYPE "public"."enum_pages_blocks_trust_items_icon";
  DROP TYPE "public"."enum_pages_blocks_trust_background";
  DROP TYPE "public"."enum_pages_blocks_documents_background";
  DROP TYPE "public"."enum_pages_blocks_steps_items_media_type";
  DROP TYPE "public"."enum_pages_blocks_steps_items_image_shape";
  DROP TYPE "public"."enum_pages_blocks_steps_items_panel_tone";
  DROP TYPE "public"."enum_pages_blocks_split_image_shape";
  DROP TYPE "public"."enum_pages_blocks_split_background";
  DROP TYPE "public"."enum_pages_blocks_timeline_background";
  DROP TYPE "public"."enum_pages_blocks_pillars_background";
  DROP TYPE "public"."enum_pages_blocks_contact_background";
  DROP TYPE "public"."enum_pages_blocks_map_buttons_kind";
  DROP TYPE "public"."enum_pages_blocks_map_buttons_style";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_buttons_kind";
  DROP TYPE "public"."enum__pages_v_blocks_hero_buttons_style";
  DROP TYPE "public"."enum__pages_v_blocks_page_hero_buttons_kind";
  DROP TYPE "public"."enum__pages_v_blocks_page_hero_buttons_style";
  DROP TYPE "public"."enum__pages_v_blocks_page_hero_variant";
  DROP TYPE "public"."enum__pages_v_blocks_stats_background";
  DROP TYPE "public"."enum__pages_v_blocks_tiles_buttons_kind";
  DROP TYPE "public"."enum__pages_v_blocks_tiles_buttons_style";
  DROP TYPE "public"."enum__pages_v_blocks_explorer_tabs_media_type";
  DROP TYPE "public"."enum__pages_v_blocks_explorer_tabs_image_shape";
  DROP TYPE "public"."enum__pages_v_blocks_explorer_tabs_panel_tone";
  DROP TYPE "public"."enum__pages_v_blocks_feature_buttons_kind";
  DROP TYPE "public"."enum__pages_v_blocks_feature_buttons_style";
  DROP TYPE "public"."enum__pages_v_blocks_location_band_buttons_kind";
  DROP TYPE "public"."enum__pages_v_blocks_location_band_buttons_style";
  DROP TYPE "public"."enum__pages_v_blocks_trust_items_icon";
  DROP TYPE "public"."enum__pages_v_blocks_trust_background";
  DROP TYPE "public"."enum__pages_v_blocks_documents_background";
  DROP TYPE "public"."enum__pages_v_blocks_steps_items_media_type";
  DROP TYPE "public"."enum__pages_v_blocks_steps_items_image_shape";
  DROP TYPE "public"."enum__pages_v_blocks_steps_items_panel_tone";
  DROP TYPE "public"."enum__pages_v_blocks_split_image_shape";
  DROP TYPE "public"."enum__pages_v_blocks_split_background";
  DROP TYPE "public"."enum__pages_v_blocks_timeline_background";
  DROP TYPE "public"."enum__pages_v_blocks_pillars_background";
  DROP TYPE "public"."enum__pages_v_blocks_contact_background";
  DROP TYPE "public"."enum__pages_v_blocks_map_buttons_kind";
  DROP TYPE "public"."enum__pages_v_blocks_map_buttons_style";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_quote_requests_status";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_audit_logs_action";
  DROP TYPE "public"."enum_site_settings_cta_buttons_kind";
  DROP TYPE "public"."enum_site_settings_cta_buttons_style";
  DROP TYPE "public"."enum_site_settings_not_found_buttons_kind";
  DROP TYPE "public"."enum_site_settings_not_found_buttons_style";`)
}
