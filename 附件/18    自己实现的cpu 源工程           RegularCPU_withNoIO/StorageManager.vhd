----------------------------------------------------------------------------------
-- Company: 
-- Engineer: 
-- 
-- Create Date:    09:19:24 07/23/2016 
-- Design Name: 
-- Module Name:    StorageManager - Behavioral 
-- Project Name: 
-- Target Devices: 
-- Tool versions: 
-- Description: 
--
-- Dependencies: 
--
-- Revision: 
-- Revision 0.01 - File Created
-- Additional Comments: 
--
----------------------------------------------------------------------------------
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

-- Uncomment the following library declaration if using
-- arithmetic functions with Signed or Unsigned values
--use IEEE.NUMERIC_STD.ALL;

-- Uncomment the following library declaration if instantiating
-- any Xilinx primitives in this code.
--library UNISIM;
--use UNISIM.VComponents.all;

entity StorageManager is
	port(
		cs:in std_logic;
		cs_alu:in std_logic;
		cs_writ:in std_logic;
		reset:in std_logic;
		res_in:in std_logic_vector(15 downto 0);
		m_datain:in std_logic_vector(7 downto 0);
		if_extern,if_io,if_read:in std_logic;
			--0  1 2 3 4 ��λ xyz  x=0  x=1 y=
		
		iord,iowr:out std_logic;
		sta,lda:out std_logic;
		data_out:out std_logic_vector(15 downto 0)
	);
end StorageManager;

architecture Behavioral of StorageManager is
	signal RTemp:std_logic_vector(15 downto 0);
	signal RTempFromAlu:std_logic_vector(15 downto 0);
	signal RTempFromMem:std_logic_vector(7 downto 0);
	signal flagReg:std_logic_vector(2 downto 0);
begin

	RTempFromAlu<=res_in;
	RTempFromMem<=m_datain;
	
	process(reset,if_extern,if_io,if_read)--�������߹�ϵ�����й���
	begin
		if reset='1' then
			flagReg<=(others=>'0');
		elsif cs_alu='1' then
			flagReg<=if_extern & if_io & if_read;
		end if;
	end process; --����мĴ������Ϳ����ӳ���������շ����ؼĴ棻���û�У�����Ҫ������������շ��Ĵ�
	
	data_out(15 downto 8)<=RTempFromAlu(15 downto 8);
	data_out(7 downto 0)<=RTempFromAlu(7 downto 0) when flagReg(2)='0' else
								RTempFromMem;
	
	process(reset,cs)--��ѡ�е�ʱ��������
	begin
		if reset='1' then
			sta<='0';
			lda<='0';
			iord<='0';
			iowr<='0';
		elsif  cs='0' then
			sta<='0';
			lda<='0';
			iord<='0';
			iowr<='0';
		elsif flagReg(2)='1' then --����cs����������(�����ź�+�����ź�)
				if flagReg(1)='0' then --��ioģʽ
					if flagReg(0)='1' then --��ģʽ
						lda<='1';sta<='0';iord<='0';iowr<='0';
					else
						sta<='1';lda<='0';iord<='0';iowr<='0';
					end if;
				else --ioģʽ
					if flagReg(0)='1' then --io��
						lda<='0';sta<='0';iord<='1';iowr<='0';
					else
						lda<='0';sta<='0';iord<='0';iowr<='1';
					end if;
				end if;
		else
				sta<='0';lda<='0';iord<='0';iowr<='0';
		end if;
	end process;

end Behavioral;

