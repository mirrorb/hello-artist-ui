export interface  ArtistItem {
    Artist: string
    Trigger: string
    Count: number
    Url: string
}

export interface CharacterItem {
    Character: string
    Copyright: string
    Trigger: string
    CoreTags: string
    Count: number
    SoloCount: number
    Url: string
}

export type ResultItemType = ArtistItem | CharacterItem

export const isArtistItem = (item: ResultItemType): item is ArtistItem => {
    return (item as ArtistItem).Artist !== undefined;
}

export const isCharacterItem = (item: ResultItemType): item is CharacterItem => {
    return (item as CharacterItem).Character !== undefined;
}

export interface SearchRequest {
    name: string
}


