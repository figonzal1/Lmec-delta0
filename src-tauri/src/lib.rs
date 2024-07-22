use hmac_sha256::HMAC;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn generate_hmac(key: &str, pre_digest: &str) -> String {
    let key_bytes = key.as_bytes();
    let data_bytes = pre_digest.as_bytes();
    let result = HMAC::mac(data_bytes, key_bytes);
    hex::encode(result)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_sql::Builder::default().build())
        .invoke_handler(tauri::generate_handler![greet, generate_hmac])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
