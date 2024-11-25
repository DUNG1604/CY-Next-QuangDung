
export function useUtils() {
    function getCookieOnClient(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    async function getCookieOnServer(name) {
        const cookies = require("next/headers").cookies;
        const cookieStore = await cookies();
        // console.log("check store",cookieStore._parsed.get(name))
        if (!cookieStore._parsed.get(name)) {
            // console.log(1)
            return null;
        }
        return cookieStore._parsed.get(name).value;
    }

    async function getCookie(name) {
        if (typeof window === 'undefined') {
            return await getCookieOnServer(name)
        }
        return getCookieOnClient(name);
    }

    function deleteCookieOnClient(name) {
        // Đặt ngày hết hạn của cookie vào thời gian trong quá khứ để xóa nó
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    async function deleteCookieOnServer(name) {
        const cookies = require("next/headers").cookies;
        const cookieStore = await cookies();
        if (cookieStore._parsed.get(name)) {
            // Giả sử Next.js có phương thức để xóa cookie, nếu không bạn cần điều chỉnh cách này
            // Không có cách trực tiếp để xóa cookie trên server trong Next.js (phải qua phản hồi HTTP)
        }
    }

    async function deleteCookie(name) {
        if (typeof window === 'undefined') {
            // Xóa cookie trên server
            await deleteCookieOnServer(name);
        } else {
            // Xóa cookie trên client
            deleteCookieOnClient(name);
        }
    }

    return {
        getCookieOnServer,
        getCookieOnClient,
        getCookie,
        deleteCookieOnServer,
        deleteCookieOnClient,
        deleteCookie
    }
}