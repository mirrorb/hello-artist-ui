export interface  ArtistItem {
    artist: string
    trigger: string
    count: number
    url: string
}

export interface CharacterItem {
    character: string
    copyright: string
    trigger: string
    coreTags: string
    count: number
    soloCount: number
    url: string
}

export type ResultItemType = ArtistItem | CharacterItem

export const isArtistItem = (item: ResultItemType): item is ArtistItem => {
    return (item as ArtistItem).artist !== undefined;
}

export const isCharacterItem = (item: ResultItemType): item is CharacterItem => {
    return (item as CharacterItem).character !== undefined;
}




