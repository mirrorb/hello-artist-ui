export const searchByName = async (name: string) => {
    const response = await fetch(`http://localhost:8081/artist/${name}`);
    if (!response.ok) {
        throw new Error(`API调用失败: ${response.status}`);
    }
    return await response.json();
}
