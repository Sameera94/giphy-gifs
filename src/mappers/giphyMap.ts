/* eslint-disable  @typescript-eslint/no-explicit-any */

export function mapGiphy(giphy: any): App.Giphy {
  return {
    id: giphy.id,
    title: giphy.title,
    url: giphy.images.fixed_height.url,
  }
}
