import {CogIcon, HomeIcon} from '@sanity/icons'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import pluralize from 'pluralize-esm'

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

const DISABLED_TYPES = ['settings', 'homepage', 'assist.instruction.context']

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Website Content')
    .items([
      // Homepage Singleton
      S.listItem()
        .title('Homepage')
        .child(S.document().schemaType('homepage').documentId('084a228b-8be1-47f1-be89-1febc205df78'))
        .icon(HomeIcon),
      S.divider(),
      ...S.documentTypeListItems()
        // Remove disabled types from the list
        .filter((listItem: any) => !DISABLED_TYPES.includes(listItem.getId()))
        // Pluralize the title of each document type.
        .map((listItem) => {
          return listItem.title(pluralize(listItem.getTitle() as string))
        }),
      S.divider(),
      // Settings Singleton
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('settings').documentId('75aeeb94-d648-4b6d-8661-73ef164d0d54'))
        .icon(CogIcon),
    ])
